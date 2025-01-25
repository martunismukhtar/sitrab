// RTRW.types.jsx
import PropTypes from "prop-types";

export const RDTRPropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ruang: PropTypes.string.isRequired,
      luas: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
