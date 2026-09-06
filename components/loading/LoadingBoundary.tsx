import React from "react";
import CardSkeleton from "../ui/loading/card-skeleton/CardSkeleton";

export function LoadingBoundary({
  isLoading,
  children,
  fallback = <CardSkeleton />,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (isLoading) return fallback;

  return children;
}
