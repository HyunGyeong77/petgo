import React from "react";
import CardSkeleton from "../ui/loading/CardSkeleton";

export function LoadingBoundary({
  isLoading,
  children,
  fallback = <CardSkeleton width={"100px"} />,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (isLoading) return fallback;

  return children;
}
