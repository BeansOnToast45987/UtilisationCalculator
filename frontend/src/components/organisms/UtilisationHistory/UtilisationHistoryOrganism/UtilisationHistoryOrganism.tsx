import { useState, useMemo } from "react";
import {
  UtilisationHistoryMoleculeStep1HistoryCardLeft,
  UtilisationHistoryMoleculeStep1HistoryCardRight,
  UtilisationHistoryMoleculeStep1Pagination,
  UtilisationHistoryMoleculeStep1Header,
  UtilisationHistoryMoleculeStep2Loader,
  UtilisationHistoryMoleculeStep3Error,
  UtilisationHistoryMoleculeStep4NoData,
} from "../../../molecules/index";
import { UtilisationHistoryOrganismProps } from "./UtilisationHistoryOrganism.types";
import "./UtilisationHistoryOrganism.scss";

const GET_HISTORY_STEPS = {
  LOADING: "loading",
  ERROR: "error",
  NO_DATA: "no-data",
  RESULT: "result",
} as const;

const DELETE_HISTORY_STEPS = {
  LOADING: "loading",
  ERROR: "error",
} as const;

export default function UtilisationHistoryOrganism({
  getUtilisationData,
  getUtilisationLoading,
  getUtilisationError,
  deleteUtilisation,
  refetchGetUtilisation,
  deleteUtilisationLoading,
  deleteUtilisationError,
  resetDeleteUtilisation,
}: UtilisationHistoryOrganismProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const calculations = getUtilisationData || [];

  const deleteHistoryStep = useMemo(() => {
    if (deleteUtilisationLoading) return DELETE_HISTORY_STEPS.LOADING;
    if (deleteUtilisationError) return DELETE_HISTORY_STEPS.ERROR;
    return null;
  }, [deleteUtilisationLoading, deleteUtilisationError]);

  const getHistoryStep = useMemo(() => {
    if (getUtilisationLoading) return GET_HISTORY_STEPS.LOADING;
    if (getUtilisationError) return GET_HISTORY_STEPS.ERROR;
    if (!calculations.length) return GET_HISTORY_STEPS.NO_DATA;
    return GET_HISTORY_STEPS.RESULT;
  }, [getUtilisationLoading, getUtilisationError, calculations.length]);

  if (deleteHistoryStep === DELETE_HISTORY_STEPS.LOADING) {
    return <UtilisationHistoryMoleculeStep2Loader />;
  }

  if (deleteHistoryStep === DELETE_HISTORY_STEPS.ERROR) {
    return (
      <UtilisationHistoryMoleculeStep3Error
        error={deleteUtilisationError!}
        onClose={resetDeleteUtilisation}
      />
    );
  }

  if (getHistoryStep === GET_HISTORY_STEPS.LOADING) {
    return <UtilisationHistoryMoleculeStep2Loader />;
  }

  if (getHistoryStep === GET_HISTORY_STEPS.ERROR) {
    return (
      <UtilisationHistoryMoleculeStep3Error
        error={getUtilisationError!}
        onClose={refetchGetUtilisation}
      />
    );
  }

  if (getHistoryStep === GET_HISTORY_STEPS.NO_DATA) {
    return <UtilisationHistoryMoleculeStep4NoData />;
  }

  const totalPages = Math.ceil(calculations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCalculations = calculations.slice(startIndex, endIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    await deleteUtilisation({ id });
    await refetchGetUtilisation();

    const remainingItems = calculations.length - 1;
    const newTotalPages = Math.ceil(remainingItems / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="utilisation-history-organism-container">
      <div className="utilisation-history-organism-main">
        <UtilisationHistoryMoleculeStep1Header />
        <div className="utilisation-history-organism-list">
          {currentCalculations.map((calc) => (
            <div key={calc.id} className="utilisation-history-organism-card">
              <UtilisationHistoryMoleculeStep1HistoryCardLeft
                percentage={calc.calculatedUtilisation}
                target={calc.targetUtilisation}
                calculatedAt={calc.calculatedAt}
                meetsTarget={calc.meetsTarget}
              />
              <UtilisationHistoryMoleculeStep1HistoryCardRight
                id={calc.id}
                startDate={calc.startDate}
                endDate={calc.endDate}
                billableHours={calc.billableHours}
                totalHours={calc.totalHours}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="utilisation-history-organism-pagination-wrapper">
          <UtilisationHistoryMoleculeStep1Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
