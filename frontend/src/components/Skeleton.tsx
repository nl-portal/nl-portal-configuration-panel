import {default as ReactSkeleton, SkeletonProps,} from "react-loading-skeleton";

interface Props extends SkeletonProps {}

const Skeleton = ({ className, ...props }: Props) => {

  return (
    <div
      className={className}
      aria-busy
      aria-disabled
    >
      <ReactSkeleton {...props} />
    </div>
  );
};

export default Skeleton;
