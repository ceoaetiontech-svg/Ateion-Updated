export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
