import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { PropertyEditorProps } from '../properties/property-editor-props';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Event from '@material-ui/icons/Event';
import { convertDateToSimpleDate } from '../properties/convert-date-to-simple-date';

export interface DatePickerOptions {}

const styles = (theme: Theme) => ({
  editor: {
    width: '100%'
  }
});

interface Props extends PropertyEditorProps<Date>, WithStyles<typeof styles> {}

class DatePickerEditor extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.value) {
      this.props.setValue(convertDateToSimpleDate(new Date()));
    }
  }

  render() {
    const { classes, value } = this.props;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          className={classes.editor}
          allowKeyboardControl
          label={this.props.propertyOptions.displayName}
          format="DD/MM/YYYY"
          value={value}
          onChange={(momentDate: moment.Moment) => {
            const newDate = momentDate.toDate();
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
            this.props.setValue(newDate);
          }}
          animateYearScrolling={false}
          rightArrowIcon={<ChevronRight />}
          leftArrowIcon={<ChevronLeft />}
          showTodayButton
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default (options: DatePickerOptions = {}) =>
  withStyles(styles)(DatePickerEditor) as React.ComponentType<PropertyEditorProps<Date>>;
