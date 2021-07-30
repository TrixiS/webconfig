import useFetcher from "../lib/useFetcher";
import TextField from "./TextField";
import Page, { PageProps } from "./Page";
import { apiUrl } from "../App";

export default function LogsPage({ children, ...rest }: PageProps) {
  const { data: logsData } = useFetcher<Logs>(`${apiUrl}/logs`);

  return (
    <Page {...rest}>
      <TextField
        className="outline-none"
        value={logsData?.text}
        readOnly={true}
        rows={33}
      />
      {children}
    </Page>
  );
}

type Logs = {
  text: string;
};
