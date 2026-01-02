import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useDeviceMediaQuery } from "../../../utils/useDeviceMediaQuery";
import {
  useCalculateUtilisation,
  useGetUtilisation,
  useDeleteUtilisation,
  CalculateUtilisationInput,
} from "../../../graphql/index";
import {
  CustomAppBar,
  UtilisationCalculatorOrganism,
  UtilisationCalculatorResultOrganism,
  UtilisationHistoryOrganism,
} from "../../organisms/index";
import "./HomeTemplate.scss";

export default function HomeTemplate() {
  const { isDesktopDevice, isLaptopDevice, isTabletDevice, isMobileDevice } =
    useDeviceMediaQuery();

  const {
    calculateUtilisation,
    calculateUtilisationData,
    calculateUtilisationLoading,
    calculateUtilisationError,
    resetCalculateUtilisation,
  } = useCalculateUtilisation();

  const {
    getUtilisationData,
    getUtilisationLoading,
    getUtilisationError,
    refetchGetUtilisation,
  } = useGetUtilisation();

  const {
    deleteUtilisation,
    deleteUtilisationLoading,
    deleteUtilisationError,
    resetDeleteUtilisation,
  } = useDeleteUtilisation();

  const handleFormSubmit = async (input: CalculateUtilisationInput) => {
    await calculateUtilisation(input);
  };

  const handleClose = async () => {
    resetCalculateUtilisation();
    await refetchGetUtilisation();
  };

  return (
    <>
      <CustomAppBar />
      {isDesktopDevice && (
        <Box className="desktop-layout-container">
          <Box className="desktop-layout-row">
            <Card className="desktop-card">
              <UtilisationCalculatorOrganism
                onSubmit={handleFormSubmit}
                loading={calculateUtilisationLoading}
                error={calculateUtilisationError}
                onClose={handleClose}
              />
            </Card>
            <Card className="desktop-card">
              {calculateUtilisationData ? (
                <UtilisationCalculatorResultOrganism
                  data={calculateUtilisationData}
                  onClose={handleClose}
                />
              ) : (
                <UtilisationHistoryOrganism
                  getUtilisationData={getUtilisationData}
                  getUtilisationLoading={getUtilisationLoading}
                  getUtilisationError={getUtilisationError}
                  deleteUtilisation={deleteUtilisation}
                  refetchGetUtilisation={refetchGetUtilisation}
                  deleteUtilisationLoading={deleteUtilisationLoading}
                  deleteUtilisationError={deleteUtilisationError}
                  resetDeleteUtilisation={resetDeleteUtilisation}
                />
              )}
            </Card>
          </Box>
        </Box>
      )}
      {isLaptopDevice && (
        <Box className="laptop-layout-container">
          <Box className="laptop-layout-row">
            <Card className="laptop-card">
              <UtilisationCalculatorOrganism
                onSubmit={handleFormSubmit}
                loading={calculateUtilisationLoading}
                error={calculateUtilisationError}
                onClose={handleClose}
              />
            </Card>
            <Card className="laptop-card">
              {calculateUtilisationData ? (
                <UtilisationCalculatorResultOrganism
                  data={calculateUtilisationData}
                  onClose={handleClose}
                />
              ) : (
                <UtilisationHistoryOrganism
                  getUtilisationData={getUtilisationData}
                  getUtilisationLoading={getUtilisationLoading}
                  getUtilisationError={getUtilisationError}
                  deleteUtilisation={deleteUtilisation}
                  refetchGetUtilisation={refetchGetUtilisation}
                  deleteUtilisationLoading={deleteUtilisationLoading}
                  deleteUtilisationError={deleteUtilisationError}
                  resetDeleteUtilisation={resetDeleteUtilisation}
                />
              )}
            </Card>
          </Box>
        </Box>
      )}
      {isTabletDevice && (
        <Box className="tablet-layout-container">
          <Card className="tablet-card-top">
            <UtilisationCalculatorOrganism
              onSubmit={handleFormSubmit}
              loading={calculateUtilisationLoading}
              error={calculateUtilisationError}
              onClose={handleClose}
            />
          </Card>
          <Card className="tablet-card-bottom">
            {calculateUtilisationData ? (
              <UtilisationCalculatorResultOrganism
                data={calculateUtilisationData}
                onClose={handleClose}
              />
            ) : (
              <UtilisationHistoryOrganism
                getUtilisationData={getUtilisationData}
                getUtilisationLoading={getUtilisationLoading}
                getUtilisationError={getUtilisationError}
                deleteUtilisation={deleteUtilisation}
                refetchGetUtilisation={refetchGetUtilisation}
                deleteUtilisationLoading={deleteUtilisationLoading}
                deleteUtilisationError={deleteUtilisationError}
                resetDeleteUtilisation={resetDeleteUtilisation}
              />
            )}
          </Card>
        </Box>
      )}
      {isMobileDevice && (
        <Box className="mobile-layout-container">
          <Card className="mobile-card-top">
            <UtilisationCalculatorOrganism
              onSubmit={handleFormSubmit}
              loading={calculateUtilisationLoading}
              error={calculateUtilisationError}
              onClose={handleClose}
            />
          </Card>
          <Card className="mobile-card-bottom">
            {calculateUtilisationData ? (
              <UtilisationCalculatorResultOrganism
                data={calculateUtilisationData}
                onClose={handleClose}
              />
            ) : (
              <UtilisationHistoryOrganism
                getUtilisationData={getUtilisationData}
                getUtilisationLoading={getUtilisationLoading}
                getUtilisationError={getUtilisationError}
                deleteUtilisation={deleteUtilisation}
                refetchGetUtilisation={refetchGetUtilisation}
                deleteUtilisationLoading={deleteUtilisationLoading}
                deleteUtilisationError={deleteUtilisationError}
                resetDeleteUtilisation={resetDeleteUtilisation}
              />
            )}
          </Card>
        </Box>
      )}
    </>
  );
}
