import { useCallback, useState } from "react";

export function useMutation<TVariables, TData, TError = Error>(opts: {
  fn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (ctx: {
    data: TData;
    variables: TVariables;
  }) => void | Promise<void>;
  onMutate?: (ctx: { variables: TVariables }) => void | Promise<void>;
  onError?: (ctx: {
    error: TError;
    variables: TVariables;
  }) => void | Promise<void>;
}) {
  const [submittedAt, setSubmittedAt] = useState<number | undefined>();
  const [variables, setVariables] = useState<TVariables | undefined>();
  const [error, setError] = useState<TError | undefined>();
  const [data, setData] = useState<TData | undefined>();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData | undefined> => {
      await opts.onMutate?.({ variables });
      setStatus("pending");
      setSubmittedAt(Date.now());
      setVariables(variables);

      try {
        const data = await opts.fn(variables);
        await opts.onSuccess?.({ data, variables });
        setStatus("success");
        setError(undefined);
        setData(data);
        return data;
      } catch (err) {
        await opts.onError?.({ error: err as TError, variables });
        setStatus("error");
        setError(err as TError);
      }
    },
    [opts],
  );

  return {
    status,
    variables,
    submittedAt,
    mutate,
    error,
    data,
  };
}
