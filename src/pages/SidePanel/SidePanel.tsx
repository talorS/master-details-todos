import { Outlet } from 'react-router-dom';
import * as O from 'fp-ts/Option';
import styles from './SidePanel.module.css';
import { Header } from '../../components/Header/Header';
import { UsersList } from '../../components/UsersList/UsersList';
import { useUsers } from '../../hooks/useUsers';
import { useUserSelection } from '../../hooks/useUserSelection';
import type { User } from '../../types/user';

export interface SidePanelOutletContext {
  selectedUserId: O.Option<number>;
  selectedUser: O.Option<User>;
}

export function SidePanel() {
  const { users, isLoading, isError, refetch } = useUsers();
  const { selectedUserId, selectedUser } = useUserSelection({ users });

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <section className={`${styles.section} ${styles.users}`}>
          <h2 className={styles.sectionTitle}>Users</h2>
          <UsersList
            users={users}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
          />
        </section>
        <section className={`${styles.section} ${styles.todos}`}>
          <Outlet
            context={
              {
                selectedUserId,
                selectedUser,
              } satisfies SidePanelOutletContext
            }
          />
        </section>
      </div>
    </div>
  );
}
