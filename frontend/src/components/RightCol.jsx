import React from 'react'
import { motion } from "framer-motion";
import "../styles/Hero.css";

const RightCol = () => {
    return (
        <>
            <motion.div
                className="hero-box p-4  "
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h2 className="fw-bold mb-3 text-uppercase">ASSOCIATION OF COMPUTING MACHINERY

                </h2>
                <p className="mb-4 ">
                   ACM (Association for Computing Machinery) is a global organization dedicated to advancing computing as a science and profession. It provides a platform for students, educators, and professionals to collaborate, share ideas, and stay updated with the latest in technology. ACM organizes conferences, coding competitions, workshops, and seminars to enhance learning and innovation in computer science. Through its digital library and publications, members gain access to high-quality research and resources.
                </p>

            </motion.div>
        </>
    )
}

export default RightCol
