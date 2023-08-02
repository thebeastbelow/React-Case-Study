import {
  RECEIVE_DATE_ELEMENT_ID,
  SOLUTION_DATE_ELEMENT_ID,
  SOLUTION_ROW_CLASS_NAME,
} from "./constants";

interface Solution {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: boolean;
}

export interface Props {
  source: Array<Solution>;
}

export default function Grid({ source }: Props) {
  return (
    <table>
      <tbody>
        {source.map(
          ({
            name,
            mailReceivedDate,
            solutionSentDate,
            isBackgroundColorRed,
          }) => (
            <tr
              key={name}
              className={SOLUTION_ROW_CLASS_NAME}
              style={isBackgroundColorRed ? { backgroundColor: "red" } : {}}
            >
              <td>{name}</td>
              <td id={RECEIVE_DATE_ELEMENT_ID}>{mailReceivedDate}</td>
              <td id={SOLUTION_DATE_ELEMENT_ID}>{solutionSentDate}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
