import React from "react";

import styles from './layout.module.css'
import MainNavigation from './MainNavigation';
import Footer from "./Footer";

export default function Layout({ children }) {
    
    return (
        <div className={styles.container}>
            <MainNavigation />
            {children}
            <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "green"
        }}>
        <Footer />
      </div>
        </div>
    )
}