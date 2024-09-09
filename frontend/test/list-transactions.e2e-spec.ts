import { expect, test } from '@playwright/test'

test('Should not able to list transactions', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const toast = page.getByText('Make your first transaction')
  const transaction1 = page.getByRole('cell', { name: 'Title number 0' })
  const transaction2 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })
  const detailsButton = page.getByRole('button', { name: 'Details' }).first()

  await expect(toast).toBeVisible()
  await expect(transaction1).not.toBeVisible()
  await expect(transaction2).not.toBeVisible()
  await expect(detailsButton).not.toBeVisible()
})

test('Should able to register a transaction', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'New transaction' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill('New Title')
  await page.getByRole('textbox', { name: 'Price' }).fill('500')
  await page.getByRole('radio', { name: 'Income' }).click()
  await page.getByRole('button', { name: 'Register' }).click()

  await page.getByRole('button', { name: 'Close' }).click()

  const toast = page.getByText('Transaction has been created.')
  const transaction1 = page.getByRole('cell', { name: 'Title number 0' })
  const transaction2 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })
  const detailsButton = page.getByRole('button', { name: 'Details' }).first()

  await expect(toast).toBeVisible()
  await expect(transaction1).toBeVisible()
  await expect(transaction2).toBeVisible()
  await expect(detailsButton).toBeVisible()
})

test('Should not register without the mandatory fields a transaction', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'New transaction' }).click()
  await page.getByRole('button', { name: 'Register' }).click()

  let titleError = page.getByText('Please enter more than 4')
  let priceError = page.getByText('Please enter a number')
  const typeError = page.getByText('Required')

  await expect(titleError).toBeVisible()
  await expect(priceError).toBeVisible()
  await expect(typeError).toBeVisible()

  await page
    .getByRole('textbox', { name: 'Title' })
    .fill(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    )
  await page.getByRole('textbox', { name: 'Price' }).fill('string')

  titleError = page.getByText('Please enter a lower title')
  priceError = page.getByText('Please enter a number')

  await expect(titleError).toBeVisible()
  await expect(priceError).toBeVisible()

  await page.getByRole('textbox', { name: 'Price' }).fill('0')

  priceError = page.getByText('Please enter a bigger number')

  await page.getByRole('textbox', { name: 'Price' }).fill('1000000')

  priceError = page.getByText('Please enter a lower number')

  await expect(titleError).toBeVisible()
  await expect(priceError).toBeVisible()
})

test('Should be able to search transactions by title', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'sessionId',
      value: 'c563c32c-539f-486a-9be9-3755394640a3',
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Title').fill('fixed')
  await page.getByRole('button', { name: 'Filter', exact: true }).click()

  const transaction1 = page.getByRole('cell', { name: 'Title number' })
  const transaction2 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })
  const transaction3 = page.getByRole('cell', {
    name: 'Fixed Outcome Transaction',
  })

  await expect(transaction1).not.toBeVisible()
  await expect(transaction2).toBeVisible()
  await expect(transaction3).toBeVisible()

  await page.waitForTimeout(2000)
})

test('Should be able to search transactions by price', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'sessionId',
      value: 'c563c32c-539f-486a-9be9-3755394640a3',
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Price').fill('-300')
  await page.getByRole('button', { name: 'Filter', exact: true }).click()

  const transaction1 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })
  const transaction2 = page.getByRole('cell', {
    name: 'Fixed Outcome Transaction',
  })

  await expect(transaction1).not.toBeVisible()
  await expect(transaction2).toBeVisible()

  await page.waitForTimeout(2000)
})

test('Should be able to search transactions by date', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'sessionId',
      value: 'c563c32c-539f-486a-9be9-3755394640a3',
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.goto('/', { waitUntil: 'networkidle' })

  await page.fill('input[placeholder="Date"]', '2024-09-01')
  await page.getByRole('button', { name: 'Filter', exact: true }).click()

  const transaction1 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })
  const transaction2 = page.getByRole('cell', {
    name: 'Fixed Outcome Transaction',
  })

  await expect(transaction1).toBeVisible()
  await expect(transaction2).not.toBeVisible()

  await page.waitForTimeout(2000)
})

test('Should be able to search transactions by type', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'sessionId',
      value: 'c563c32c-539f-486a-9be9-3755394640a3',
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.goto('/', { waitUntil: 'networkidle' })

  await page.selectOption('select[name="type"]', 'outcome')
  await page.getByRole('button', { name: 'Filter', exact: true }).click()

  const transaction1 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })
  const transaction2 = page.getByRole('cell', {
    name: 'Fixed Outcome Transaction',
  })

  await expect(transaction1).not.toBeVisible()
  await expect(transaction2).toBeVisible()

  await page.waitForTimeout(2000)
})

test('Should be able to clear filters', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'sessionId',
      value: 'c563c32c-539f-486a-9be9-3755394640a3',
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.goto('/?title=fixed&type=all&created_at=2024-09-01', {
    waitUntil: 'networkidle',
  })

  const transaction1 = page.getByRole('cell', {
    name: 'Fixed Income Transaction',
  })

  await expect(transaction1).toBeVisible()

  await page.getByRole('button', { name: 'Remove filters' }).click()

  const currentUrl = await page.url()

  expect(currentUrl).toBe('http://localhost:3000/')

  const transaction2 = page.getByRole('cell', { name: 'Title number 0' })

  const detailsButton = page.getByRole('button', { name: 'Details' }).first()

  await expect(transaction1).toBeVisible()
  await expect(transaction2).toBeVisible()
  await expect(detailsButton).toBeVisible()

  await page.waitForTimeout(2000)
})
