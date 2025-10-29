<template>
  <div class="container">
    <h1 class="text-5xl flex align-top mb-1">
      Orderbekräftelse
      <span class="text-[0.5em] ml-2">[{{ order.order.order_number }}]</span>
    </h1>
    <p class="text-lg">Du får ett mail när din order är klar.</p>

    <div class="border border-zinc-200 px-8 py-12 mt-10">
      <div class="flex -mx-10">
        <div class="w-1/4 px-10">
          <p>
            <b class="font-normal text-lg mb-1 block">Orderdatum</b>
            {{ order.order.created_at }}
          </p>
        </div>
        <div class="w-1/4 px-10 border-l border-zinc-200">
          <p>
            <b class="font-normal text-lg mb-1 block">Betalningsmetod</b>
            {{ order.order.payment_details.credit_card_company }}
            {{ order.order.payment_details.credit_card_number }}
          </p>
        </div>
        <div class="w-1/4 px-10 border-l border-zinc-200">
          <p>
            <b class="font-normal text-lg mb-1 block">Kontaktinformation</b>
            {{ order.order.contact_email }}
          </p>
        </div>
        <div class="w-1/4 px-10 border-l border-zinc-200">
          <p>
            <b class="font-normal text-lg mb-1 block">Fraktmetod</b>
            {{ order.order.shipping_lines[0].code }}
          </p>
        </div>
      </div>
    </div>

    <div class="border border-zinc-200 mt-10 px-8 py-12">
      <div class="flex -mx-10">
        <div class="w-1/2 px-10">
          <h2 class="text-xl mb-3">Leveransadress</h2>
          <address class="not-italic">
            {{ order.order.shipping_address.name }}<br />
            {{ order.order.shipping_address.company }}<br />
            {{ order.order.shipping_address.address1 }}<br />
            {{ order.order.shipping_address.zip }}
            {{ order.order.shipping_address.city }}<br />
            {{ order.order.shipping_address.country }}<br />
            {{ order.order.shipping_address.phone }}
          </address>
        </div>
        <div class="w-1/2 px-10 border-l border-zinc-200">
          <h2 class="text-xl mb-3">Faktureringsadress</h2>
          <address class="not-italic">
            {{ order.order.billing_address.name }}<br />
            {{ order.order.billing_address.company }}<br />
            {{ order.order.billing_address.address1 }}<br />
            {{ order.order.billing_address.zip }}
            {{ order.order.billing_address.city }}<br />
            {{ order.order.billing_address.country }}<br />
            {{ order.order.billing_address.phone }}
          </address>
        </div>
      </div>
    </div>

    <nuxt-link href="/shop/" class="inline-block px-6 py-4 bg-black text-white mt-10">Fortsätt handla</nuxt-link>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: order } = await useAsyncData("order", () =>
  $fetch("https://wilson-creative-dev.myshopify.com/admin/api/2022-04/orders/" + route.params.id + ".json", {
    headers: { "X-Shopify-Access-Token": "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" },
  })
);
</script>
