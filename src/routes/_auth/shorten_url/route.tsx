import type { APIResponse } from '@/@types/ApiResponse';
import type { ShortenUrlRequest } from '@/@types/requests/ShortenUrlRequest';
import type { ShortenedUrlResponse } from '@/@types/responses/shortenUrlResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/useForm';
import { useMutation } from '@/hooks/useMutation';
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Link2 } from 'lucide-react';
import type { FormEvent } from 'react';

const Index = () => {

  const { mutateFn, pending, error } = useMutation<ShortenUrlRequest, APIResponse<ShortenedUrlResponse>>({
    url: 'http://localhost:5000/minurl',
    method: 'POST',
  });

  const initialValues: ShortenUrlRequest = {
    payload: "",
  };

  const validate = (values: ShortenUrlRequest) => {
    const errors: Partial<Record<keyof typeof initialValues, string>> = {};

    if (!values.payload) {
      errors.payload = "Please paste a URL to get started";
    }

    try {
      new URL(values.payload);
    } catch (e: unknown) {
      errors.payload = (e as Error)?.message
    }

    return errors;
  }

  const { values, handleChange, handleBlur, handleSubmit } = useForm(
    initialValues,
    validate,
  );

  const createUrl = async () => {
    const result = await mutateFn(values);
    if (result) {
      console.log(result.data.short_url);
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(createUrl);
  }



  return (
    <div className="bg-slate-200 h-full w-full flex items-center">
      <div className="flex flex-col w-full lg:w-4/5 mx-auto">
        <article className="w-full flex flex-col items-center gap-2">
          <h2 className="font-extrabold text-3xl">Create your URL.</h2>
          <form onSubmit={onSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                type="url"
                name="payload"
                placeholder="Paste your long URL here..."
                value={values.payload}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-14 pl-12 pr-4 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl text-base"
                aria-label="URL to shorten"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base"
            >
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </form>
        </article>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_auth/shorten_url')({
  component: Index,
})

