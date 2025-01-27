import { useAdminResources } from "pages/Admin/Guard";
import { useDonationsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

// import DonationsTable from "./DonationsTable";

export default function Donations({ classes = "" }: { classes?: string }) {
  const { endowmentId } = useAdminResources();
  const { data, isLoading, isError } = useDonationsQuery({
    id: endowmentId.toString(),
  });

  return (
    <div className={`grid grid-rows-[auto_1fr] ${classes}`}>
      <h1 className="text-2xl font-extrabold uppercase mb-2">
        Received donations
      </h1>
      <QueryLoader
        queryState={{
          data: data?.Items,
          isLoading,
          isError,
        }}
        messages={{
          loading: "Fetching donations..",
          error: "Failed to get donations",
          empty: "No donations found",
        }}
      >
        {(donations) => <Table donations={donations} />}
      </QueryLoader>
    </div>
  );
}
