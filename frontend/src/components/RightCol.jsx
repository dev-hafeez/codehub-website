import React from 'react'
import { motion } from "framer-motion";
<<<<<<< HEAD
import "./Hero.css";
=======
import "../styles/Hero.css";
>>>>>>> feature/achievements-blog

const RightCol = () => {
    return (
        <>
            <motion.div
<<<<<<< HEAD
                className="hero-box p-4 rounded "
=======
                className="hero-box p-4  "
>>>>>>> feature/achievements-blog
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
<<<<<<< HEAD
                <h2 className="fw-bold mb-3 text-uppercase">Association of Computing Machinery</h2>
                <p className="mb-4">
                    ACM, the world's largest educational and scientific computing society,
                    delivers resources that advance computing as a science and a profession.
                    ACM provides the computing field's premier Digital Library and serves its members
                    and the computing profession with leading-edge publications, conferences,
                    and career resources.
=======
                <h2 className="fw-bold mb-3 text-uppercase">ASSOCIATION OF COMPUTING MACHINERY

                </h2>
                <p className="mb-4 ">
                   ACM (Association for Computing Machinery) is a global organization dedicated to advancing computing as a science and profession. It provides a platform for students, educators, and professionals to collaborate, share ideas, and stay updated with the latest in technology. ACM organizes conferences, coding competitions, workshops, and seminars to enhance learning and innovation in computer science. Through its digital library and publications, members gain access to high-quality research and resources.
>>>>>>> feature/achievements-blog
                </p>

            </motion.div>
        </>
    )
}

export default RightCol
