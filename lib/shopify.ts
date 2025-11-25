// Shopify Storefront API integration
// These values come from environment variables set in Vercel

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export async function createCheckout(variantId: string): Promise<string | null> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    console.error('Shopify credentials not configured');
    return null;
  }

  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
              cart {
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            lines: [
              {
                merchandiseId: variantId,
                quantity: 1
              }
            ]
          }
        }
      })
    });

    const { data, errors } = await response.json();
    
    if (errors) {
      console.error('Shopify API errors:', errors);
      return null;
    }

    if (data?.cartCreate?.userErrors?.length > 0) {
      console.error('Cart creation errors:', data.cartCreate.userErrors);
      return null;
    }

    return data?.cartCreate?.cart?.checkoutUrl || null;
  } catch (error) {
    console.error('Failed to create checkout:', error);
    return null;
  }
}

export async function redirectToCheckout(variantId: string): Promise<void> {
  const checkoutUrl = await createCheckout(variantId);
  
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  } else {
    alert('Unable to start checkout. Please try again.');
  }
}
