import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'

import { getSummary } from '@/api/get-summary'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function Summary() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  return (
    <>
      <section className="hidden w-full grid-cols-3 gap-4 md:grid">
        <Card>
          <CardHeader className="flex">
            <CardTitle>Incomes</CardTitle>
            <CardDescription>
              <ArrowCircleUp className="h-8 w-8 fill-primary" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            {summary
              ? summary.incomes.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              : '$0.00'}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex">
            <CardTitle>Outcomes</CardTitle>
            <CardDescription>
              <ArrowCircleDown className="h-8 w-8 fill-destructive" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            {summary
              ? summary?.outcomes.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              : '$0.00'}
          </CardContent>
        </Card>

        <Card className="bg-primary">
          <CardHeader className="flex">
            <CardTitle className="text-white">Total</CardTitle>
            <CardDescription>
              <CurrencyDollar className="h-8 w-8 fill-white" />
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white">
            {summary
              ? summary?.total.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              : '$0.00'}
          </CardContent>
        </Card>
      </section>

      <section className="flex items-center md:hidden">
        <Carousel className="mx-auto w-[70%]">
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardHeader className="flex">
                  <CardTitle>Incomes</CardTitle>
                  <CardDescription>
                    <ArrowCircleUp className="h-8 w-8 fill-primary" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {summary?.incomes.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardHeader className="flex">
                  <CardTitle>Outcomes</CardTitle>
                  <CardDescription>
                    <ArrowCircleDown className="h-8 w-8 fill-destructive" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {summary?.outcomes.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="bg-primary">
                <CardHeader className="flex">
                  <CardTitle className="text-white">Total</CardTitle>
                  <CardDescription>
                    <CurrencyDollar className="h-8 w-8 fill-white" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  {summary?.total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  )
}
