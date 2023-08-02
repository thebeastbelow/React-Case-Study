import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { EMPTY_STRING } from "./constants";

const ERROR_CLASS_NAME = "error";
dayjs.extend(customParseFormat);

export interface Props {
  onChange: Function;
}

export default function TestInputs({ onChange }: Props) {
  const [today, setToday] = useState(EMPTY_STRING);
  const [limit, setLimit] = useState(EMPTY_STRING);
  const [todayError, setTodayError] = useState(false);
  const [limitError, setLimitError] = useState(false);

  const changeHandler =
    (
      setFunction: Dispatch<SetStateAction<string>>
    ): ChangeEventHandler<HTMLInputElement> =>
    ({ target: { value: newValue } }) => {
      setFunction(newValue);
    };

  const resetInputs = () => {
    setToday(EMPTY_STRING);
    setLimit(EMPTY_STRING);
  };

  const validateToday = (todayValue: string) =>
    dayjs(todayValue, "YYYY-MM-DD", true).isValid();

  const validateLimit = (limitValue: string) => /^\d+$/.test(limitValue);

  useEffect(() => {
    if (today) {
      setTodayError(!validateToday(today));
    } else {
      setTodayError(false);
    }
    if (limit) {
      setLimitError(!validateLimit(limit));
    } else {
      setLimitError(false);
    }
  }, [today, limit]);

  useEffect(() => {
    if (!(todayError || limitError)) {
      onChange(today, limit);
    }
  }, [today, limit, todayError, limitError]);

  return (
    <>
      <input
        type="text"
        placeholder="Today"
        value={today}
        onChange={changeHandler(setToday)}
        className={todayError ? ERROR_CLASS_NAME : EMPTY_STRING}
      />
      <input
        type="text"
        placeholder="Limit"
        value={limit}
        onChange={changeHandler(setLimit)}
        className={limitError ? ERROR_CLASS_NAME : EMPTY_STRING}
      />
      <button onClick={resetInputs}>Reset</button>
    </>
  );
}
