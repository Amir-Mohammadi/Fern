import Button from '@Components/button';
import DropDown from '@Components/dropdown';
import moment from 'jalali-moment';
import React, { useState } from 'react';
import styles from './datepicker-form.module.scss';

interface props {
  year: number;
  month: number;
  day: number;
  changeDay: (value: number) => void;
  changeYear: (value: number) => void;
  changeMonth: (value: number) => void;
  onSubmitChange?: Function;
}

export type DatePickerProps = props;

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(monthList.findIndex((month) => month.value == props.month));
  const [selectedYear, setSelectedYear] = useState(getYearsList().findIndex((year) => year.value == props.year));
  const [selectedDay, setSelectedDay] = useState(
    selectedMonth == -1
      ? -1
      : getDaysList(monthList[selectedMonth].value, getYearsList()[selectedYear].value).findIndex(
          (day) => day.value == props.day,
        ),
  );

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <span>روز</span>
        <DropDown
          option={
            selectedMonth == -1 ? [] : getDaysList(monthList[selectedMonth].value, getYearsList()[selectedYear].value)
          }
          selectedIndex={[selectedDay]}
          disabled={selectedMonth == -1}
          onSelect={(i) => {
            props.changeDay(getDaysList(monthList[selectedMonth].value, getYearsList()[selectedYear].value)[i].value);
            setSelectedDay(i);
          }}
        />
      </div>
      <div className={styles.inputGroup}>
        <span>ماه</span>
        <DropDown
          option={monthList}
          selectedIndex={[selectedMonth]}
          disabled={selectedYear == -1}
          onSelect={(i) => {
            props.changeMonth(monthList[i].value);
            setSelectedMonth(i);
            setSelectedDay(-1);
          }}
        />
      </div>
      <div className={styles.inputGroup}>
        <span>سال</span>
        <DropDown
          option={getYearsList()}
          selectedIndex={[selectedYear]}
          onSelect={(i) => {
            props.changeYear(getYearsList()[i].value);
            setSelectedYear(i);
            setSelectedMonth(-1);
            setSelectedDay(-1);
          }}
        />
      </div>
      <div className={styles.formFT}>
        <Button.Basic
          onClick={() => {
            props.onSubmitChange!();
          }}
          buttonClassName={styles.success}
          text={'ثبت'}
        />
      </div>
    </div>
  );
};

type yearsList = { title: string; value: number };
const getYearsList = (): Array<yearsList> => {
  const currentYear: number = moment().jYear();

  const yearsList: Array<yearsList> = [];

  for (var i = 1320; i <= currentYear; i++) {
    yearsList.push({ title: '' + i, value: i });
  }

  return yearsList;
};

type daysList = { title: string; value: number };
const getDaysList = (month: number, year: number): Array<daysList> => {
  const daysList: Array<daysList> = [];

  if (month >= 1 && month <= 6) {
    for (var i = 1; i <= 31; i++) {
      daysList.push({ title: '' + i, value: i });
    }
  } else if (month >= 7 && month <= 11) {
    for (var i = 1; i <= 30; i++) {
      daysList.push({ title: '' + i, value: i });
    }
  } else {
    if (moment.jIsLeapYear(year)) {
      for (var i = 1; i <= 30; i++) {
        daysList.push({ title: '' + i, value: i });
      }
    } else {
      for (var i = 1; i <= 29; i++) {
        daysList.push({ title: '' + i, value: i });
      }
    }
  }

  return daysList;
};

const monthList = [
  { title: 'فروردین', value: 1 },
  { title: 'اردیبهشت', value: 2 },
  { title: 'خردار', value: 3 },
  { title: 'تیر', value: 4 },
  { title: 'مردار', value: 5 },
  { title: 'شهریور', value: 6 },
  { title: 'مهر', value: 7 },
  { title: 'آبان', value: 8 },
  { title: 'آذر', value: 9 },
  { title: 'دی', value: 10 },
  { title: 'بهمن', value: 11 },
  { title: 'اسفند', value: 12 },
];

export default DatePicker;
