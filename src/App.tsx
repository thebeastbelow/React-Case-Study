import dayjs from "dayjs";
import {
  EMPTY_STRING,
  RECEIVE_DATE_ELEMENT_ID,
  SOLUTION_DATE_ELEMENT_ID,
  SOLUTION_ROW_CLASS_NAME,
} from "./constants";
import dataList from "./data.json";
import Grid from "./grid";
import TestInputs from "./inputs";
import "./style.css";

const LIMIT_UNIT = "days";
const LATE_CLASS_NAME = "red";
const TIMELY_CLASS_NAME = "green";
const RESULT_ELEMENT_ID = "result";

function control(today: Date, limit: number) {
  const solutions = document.getElementsByClassName(SOLUTION_ROW_CLASS_NAME);
  const result = document.getElementById(RESULT_ELEMENT_ID)!;

  for (const solution of solutions) {
    solution.classList.remove(LATE_CLASS_NAME, TIMELY_CLASS_NAME);
    result.textContent = EMPTY_STRING;
  }

  if (today && limit) {
    let lateSubmissionCount = 0;
    for (const solution of solutions) {
      const mailReceivedDate = dayjs(
        solution.children.namedItem(RECEIVE_DATE_ELEMENT_ID)?.textContent
      );
      const solutionSentDate = dayjs(
        solution.children.namedItem(SOLUTION_DATE_ELEMENT_ID)?.textContent ||
          today
      );

      const isLate = solutionSentDate.isAfter(
        mailReceivedDate.add(limit, LIMIT_UNIT)
      );

      solution.classList.add(isLate ? LATE_CLASS_NAME : TIMELY_CLASS_NAME);
      lateSubmissionCount += isLate ? 1 : 0;
    }

    result.textContent = `${lateSubmissionCount}`;
  }
}

export default function App() {
  let sourceProp = dataList;
  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <Grid source={sourceProp} />
      <TestInputs onChange={control} />
      <p>
        Control function result: <span id={RESULT_ELEMENT_ID}></span>
      </p>
    </div>
  );
}
