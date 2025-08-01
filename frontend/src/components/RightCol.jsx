import React from 'react'
import { motion } from "framer-motion";
import "./Hero.css";

const RightCol = () => {
    return (
        <>
            <motion.div
                className="hero-box p-4 rounded "
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h2 className="fw-bold mb-3 text-uppercase">Association of Computing Machinery</h2>
                <p className="mb-4">
                    ACM, the world's largest educational and scientific computing society,
                    delivers resources that advance computing as a science and a profession.
                    ACM provides the computing field's premier Digital Library and serves its members
                    and the computing profession with leading-edge publications, conferences,
                    and career resources.
                </p>

            </motion.div>
        </>
    )
}

export default RightCol
