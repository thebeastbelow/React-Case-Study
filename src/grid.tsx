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
            <tr style={isBackgroundColorRed ? { backgroundColor: "red" } : {}}>
              <td>{name}</td>
              <td>{mailReceivedDate}</td>
              <td>{solutionSentDate}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
