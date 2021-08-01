import useFetcher from "../lib/useFetcher";
import TextField from "./TextField";
import Page, { PageProps } from "./Page";
import { apiUrl } from "../App";

export default function LogsPage({ children, ...rest }: PageProps) {
  const { data: logsData } = useFetcher<Logs>(`${apiUrl}/logs`, {
    refreshInterval: 5000,
  });

  const handleDelete = () => fetch(`${apiUrl}/logs`, { method: "DELETE" });

  const handleDownload = async () => {
    if (!logsData) return;

    const fileLink = document.createElement("a");
    const url = window.URL.createObjectURL(new Blob([logsData.text]));
    fileLink.href = url;
    fileLink.setAttribute("download", "logs.txt");
    fileLink.click();
    fileLink.parentNode?.removeChild(fileLink);
  };

  return (
    <Page {...rest}>
      <TextField
        className="outline-none"
        value={logsData?.text}
        readOnly={true}
        rows={32}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
      {children}
    </Page>
  );
}

type Logs = {
  text: string;
};
