import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClubsSection.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const textVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Reusable hover props
const hoverEffect = {
  y: -10,
  scale: 1.03,
  boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
};

const ClubsSection = () => {
  return (
    <div className="clubs-container container-fluid position-relative">
      {/* Background Shapes */}
      <div className="bg-shape bottom-left-triangle"></div>
      <div className="bg-shape top-right-triangle"></div>

      {/* Center Circle */}
      <div
        className="center-circle text-center d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#0c4182" }}
      >
        CLUBS
      </div>

      {/* Club Boxes Wrapper */}
      <div className="club-boxes-wrapper">
        <motion.div
          className="club-box code-hub text-center"
          whileHover={hoverEffect}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="connector connector-top-left"></div>
          <h4>CODE HUB</h4>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Empowering coders through hands-on learning and real-world challenges.
          </motion.p>
        </motion.div>

        <motion.div
          className="club-box events-logistics text-center"
          whileHover={hoverEffect}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="connector connector-top-right"></div>
          <h4>EVENTS & LOGISTICS</h4>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Seamlessly managing every detail to create impactful tech experiences.
          </motion.p>
        </motion.div>

        <motion.div
          className="club-box media-marketing text-center"
          whileHover={hoverEffect}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="connector connector-bottom-left"></div>
          <h4>MEDIA & MARKETING</h4>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Spreading the ACM vision through creative and engaging campaigns.
          </motion.p>
        </motion.div>

        <motion.div
          className="club-box decor text-center"
          whileHover={hoverEffect}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="connector connector-bottom"></div>
          <h4>DECOR</h4>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Designing vibrant spaces that reflect the spirit of innovation.
          </motion.p>
        </motion.div>

        <motion.div
          className="club-box graphics text-center"
          whileHover={hoverEffect}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="connector connector-bottom-right"></div>
          <h4>GRAPHICS</h4>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Crafting visual stories that capture attention and inspire curiosity.
          </motion.p>
        </motion.div>
      </div>

     
      <Link to="/teams">
        <button className="btn btn-primary learn-more-btn">Learn more →</button>
      </Link>
    </div>
  );
};

export default ClubsSection;
