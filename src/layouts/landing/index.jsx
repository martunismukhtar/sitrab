
import Navbar from "./navbar";
import PropTypes from "prop-types";

const LandingLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen relative">
      <Navbar />
      <main className="relative flex flex-1 pt-20 overflow-hidden">
      {children}
      </main>
      
    </div>
  );
};

export default LandingLayout;
LandingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};