import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/variants";
import UserListView from "../components/users/UserListView";

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title>Ateion Admin — Users</title>
        <meta name="description" content="View and manage users in the Ateion admin portal." />
      </Helmet>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <UserListView />
      </motion.div>
    </>
  );
}
