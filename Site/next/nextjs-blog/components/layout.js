import styles from './layout.module.css'
import MainNavigation from './MainNavigation';

export default function Layout({ children }) {
    
    return (
        <div className={styles.container}>
            <MainNavigation />
            {children}
        </div>
    )
}