import { useEffect, useState } from "react";
import { columns, type Sku } from "./columns";
import { DataTable } from "./data-table";
import UpdateSkuDialog from "./update-sku-dialog";
import CreateSkuDialog from "./create-sku-dialog";
import ChangeStateDialog from "./chage-state-dialog";

const url = import.meta.env.VITE_API_URL;

function SkusPage() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [updatingSku, setUpdatingSku] = useState<Sku>();
  const [refetch, setRefetch] = useState<boolean>(true);
  const [skus, setSkus] = useState<Sku[]>([]);

  const handleRefetch = () => setRefetch(!refetch);

  const getSkus = async () => {
    try {
      const query = new URLSearchParams();
      query.append("page", `${page}`);

      const response = await fetch(`${url}/skus?${query}`);
      const responseJson = await response.json();
      const { data, hasMore } = responseJson;

      setSkus(data);
      setHasMore(hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  };

  const updateDialogFuncion = (sku: Sku) => {
    setUpdatingSku(sku);
    setOpenUpdateDialog(true);
  };

  const createDialogFuncion = () => {
    setOpenCreateDialog(true);
  };

  const stateChangeDialogFuncion = (sku: Sku) => {
    setUpdatingSku(sku);
    setOpenChangeStateDialog(true);
  };

  const handlePagination = (direction: "up" | "down") => {
    if (direction === "up") {
      setPage(page + 1);
      setRefetch(true);
      return;
    }

    if (direction === "down" && page > 1) {
      setPage(page - 1);
      setRefetch(true);
      return;
    }
  };

  useEffect(() => {
    if (refetch) {
      getSkus();
    }
  }, [refetch]);

  return (
    <div className="py-2">
      <h1 className="pb-5"> Gerenciamento de SKUS: </h1>
      <DataTable
        columns={columns(updateDialogFuncion, stateChangeDialogFuncion)}
        data={skus}
        handleOpen={createDialogFuncion}
        hasMore={hasMore}
        handlePagination={handlePagination}
        page={page}
      />
      {openCreateDialog && (
        <CreateSkuDialog
          handleOpen={setOpenCreateDialog}
          open={openCreateDialog}
          handleRefetch={handleRefetch}
        />
      )}
      {updatingSku && (
        <UpdateSkuDialog
          open={openUpdateDialog}
          sku={updatingSku}
          handleOpen={setOpenUpdateDialog}
          handleRefetch={handleRefetch}
        />
      )}
      {updatingSku && (
        <ChangeStateDialog
          sku={updatingSku}
          open={openChangeStateDialog}
          handleOpen={setOpenChangeStateDialog}
          handleRefetch={handleRefetch}
        />
      )}
    </div>
  );
}

export default SkusPage;
