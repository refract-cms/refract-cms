import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar } from '@material-ui/core';
import type { EntitySchema } from './entity-schema';
import type { Entity } from './entity';
import type { ListItemProps } from '@material-ui/core/ListItem';
import { entityService } from './services/entity-service';
import type { WithCoreContextProps } from '../context/with-core-context-props';
import { withCoreContext } from '../context/with-core-context';

interface EntityListItemProps extends ListItemProps<any> {
  schema: EntitySchema;
  entity: Entity;
  SecondaryAction?: JSX.Element;
}

interface Props extends EntityListItemProps, WithCoreContextProps {}

const EntityListItem = (props: Props) => {
  const { schema, entity, context, SecondaryAction } = props;
  const instanceDisplayProps = entityService.instanceDisplayPropsOrDefault(schema, context)(entity);
  const listItemProps: any = {
    ...props,
  };
  delete listItemProps['SecondaryAction'];
  return (
    <ListItem {...listItemProps}>
      <ListItemAvatar>
        <Avatar src={instanceDisplayProps.imageUrl}>
          {schema.options.icon ? <schema.options.icon /> : schema.options.alias[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
        primary={instanceDisplayProps.primaryText}
        secondary={instanceDisplayProps.secondaryText}
      />
      {SecondaryAction && <ListItemSecondaryAction>{SecondaryAction}</ListItemSecondaryAction>}
    </ListItem>
  );
};

export default withCoreContext(EntityListItem) as React.ComponentType<EntityListItemProps>;
