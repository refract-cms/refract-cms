import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Page from "../pages/Page";
import {
  Typography,
  Grid,
  CardContent,
  CardHeader,
  Card,
  TableBody,
  TableRow,
  TableCell,
  Table,
  CircularProgress,
  CardActions,
  Button,
  Avatar,
} from "@material-ui/core";
import { AppState } from "../state/app-state";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { createLinkComponent } from "../shared/create-link-component";

interface OverviewPageProps
  extends RouteComponentProps,
    ReturnType<typeof mapStateToProps> {}

class OverviewPage extends React.Component<OverviewPageProps> {
  render() {
    const { schemas, QUERY, routes } = this.props;
    return (
      <Page title="Overview">
        <Query query={QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            return (
              <Grid container spacing={2}>
                {schemas.map((schema) => {
                  const count = data[`${schema.options.alias}Count`];
                  return (
                    <Grid
                      key={schema.options.alias}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2}
                    >
                      <Card>
                        <CardHeader
                          title={
                            schema.options.displayName || schema.options.alias
                          }
                          avatar={
                            <Avatar>
                              {schema.options.icon ? (
                                <schema.options.icon />
                              ) : (
                                schema.options.alias[0].toUpperCase()
                              )}
                            </Avatar>
                          }
                        />
                        <CardContent>
                          <Typography>Total: {count}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            color="secondary"
                            fullWidth
                            variant="outlined"
                            size="small"
                            component={createLinkComponent(
                              routes.entity.list.createUrl(schema)
                            )}
                          >
                            Start editing
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            );
          }}
        </Query>
      </Page>
    );
  }
}

function mapStateToProps(state: AppState) {
  const countFields = state.config.schema.map((s) => `${s.options.alias}Count`)
    .join(`
  `);
  const QUERY = gql`
  {
    ${countFields}
  }
  `;
  return {
    schemas: state.config.schema,
    QUERY,
    routes: state.router.routes,
  };
}

export default connect(mapStateToProps)(OverviewPage);
