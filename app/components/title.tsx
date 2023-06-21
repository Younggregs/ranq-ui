import Link from 'next/link'
import styles from '../page.module.css'

export default function Title() {
    return (
        <div className={styles.description}>
            <Link href={'/'}>
                <p>Rank</p>
            </Link>
        </div>
        )

}