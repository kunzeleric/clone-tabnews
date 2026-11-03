import Card from "components/Card";
import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) return <div>Carregando...</div>;

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt updatedAt={data.updated_at} />
      <DatabaseInformation database={data.dependencies.database} />
    </>
  );
}

function UpdatedAt({ updatedAt }) {
  return (
    <div>Última atualização: {new Date(updatedAt).toLocaleString("pt-BR")}</div>
  );
}

function DatabaseInformation({ database }) {
  return (
    <div style={styles.wrapper}>
      <Card title={"Max. Connections"} content={database.max_connections} />
      <Card
        title={"Opened Connections"}
        content={database.opened_connections}
      />
      <Card title={"DB Version"} content={database.version} />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "2rem",
    paddingTop: "1rem",
  },
};
