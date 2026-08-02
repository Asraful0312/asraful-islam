/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as billing from "../billing.js";
import type * as blogs from "../blogs.js";
import type * as comments from "../comments.js";
import type * as email from "../email.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as image from "../image.js";
import type * as notes from "../notes.js";
import type * as products from "../products.js";
import type * as project from "../project.js";
import type * as r2 from "../r2.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  billing: typeof billing;
  blogs: typeof blogs;
  comments: typeof comments;
  email: typeof email;
  helpers: typeof helpers;
  http: typeof http;
  image: typeof image;
  notes: typeof notes;
  products: typeof products;
  project: typeof project;
  r2: typeof r2;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  r2: {
    lib: {
      deleteMetadata: FunctionReference<
        "mutation",
        "internal",
        { bucket: string; key: string },
        null
      >;
      deleteObject: FunctionReference<
        "mutation",
        "internal",
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          secretAccessKey: string;
        },
        null
      >;
      deleteR2Object: FunctionReference<
        "action",
        "internal",
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          secretAccessKey: string;
        },
        null
      >;
      getMetadata: FunctionReference<
        "query",
        "internal",
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          secretAccessKey: string;
        },
        {
          bucket: string;
          bucketLink: string;
          contentType?: string;
          key: string;
          lastModified: string;
          link: string;
          sha256?: string;
          size?: number;
          url: string;
        } | null
      >;
      listMetadata: FunctionReference<
        "query",
        "internal",
        {
          accessKeyId: string;
          bucket: string;
          cursor?: string;
          endpoint: string;
          limit?: number;
          secretAccessKey: string;
        },
        {
          continueCursor: string;
          isDone: boolean;
          page: Array<{
            bucket: string;
            bucketLink: string;
            contentType?: string;
            key: string;
            lastModified: string;
            link: string;
            sha256?: string;
            size?: number;
            url: string;
          }>;
          pageStatus?: null | "SplitRecommended" | "SplitRequired";
          splitCursor?: null | string;
        }
      >;
      store: FunctionReference<
        "action",
        "internal",
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          secretAccessKey: string;
          url: string;
        },
        any
      >;
      syncMetadata: FunctionReference<
        "action",
        "internal",
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          onComplete?: string;
          secretAccessKey: string;
        },
        null
      >;
      upsertMetadata: FunctionReference<
        "mutation",
        "internal",
        {
          bucket: string;
          contentType?: string;
          key: string;
          lastModified: string;
          link: string;
          sha256?: string;
          size?: number;
        },
        { isNew: boolean }
      >;
    };
  };
  creem: {
    lib: {
      createOrder: FunctionReference<
        "mutation",
        "internal",
        {
          order: {
            affiliate?: string | null;
            amount: number;
            amountDue?: number;
            amountPaid?: number;
            checkoutId?: string | null;
            createdAt: string;
            currency: string;
            customerId: string;
            discountAmount?: number;
            discountId?: string | null;
            id: string;
            metadata?: Record<string, any>;
            mode?: string;
            productId: string;
            status: string;
            subTotal?: number;
            taxAmount?: number;
            transactionId?: string | null;
            type: string;
            updatedAt: string;
          };
        },
        any
      >;
      createProduct: FunctionReference<
        "mutation",
        "internal",
        {
          product: {
            billingPeriod?: string;
            billingType: string;
            createdAt: string;
            currency: string;
            defaultSuccessUrl?: string | null;
            description: string | null;
            features?: Array<{ description: string; id: string }>;
            id: string;
            imageUrl?: string;
            metadata?: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            name: string;
            price: number;
            productUrl?: string;
            status: string;
            taxCategory?: string;
            taxMode?: string;
          };
        },
        any
      >;
      createSubscription: FunctionReference<
        "mutation",
        "internal",
        {
          subscription: {
            amount: number | null;
            cancelAtPeriodEnd: boolean;
            canceledAt?: string | null;
            checkoutId: string | null;
            collectionMethod?: string;
            createdAt: string;
            currency: string | null;
            currentPeriodEnd: string | null;
            currentPeriodStart: string;
            customerId: string;
            discountId?: string | null;
            endedAt: string | null;
            endsAt?: string | null;
            id: string;
            lastTransactionId?: string | null;
            metadata: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            nextTransactionDate?: string | null;
            priceId?: string;
            productId: string;
            recurringInterval: string | null;
            seats?: number | null;
            startedAt: string | null;
            status: string;
            trialEnd?: string | null;
            trialStart?: string | null;
          };
        },
        any
      >;
      executeSubscriptionLifecycle: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          cancelMode?: string;
          operation: "cancel" | "resume" | "pause";
          previousCancelAtPeriodEnd?: boolean;
          previousStatus?: string;
          serverIdx?: number;
          serverURL?: string;
          subscriptionId: string;
        },
        any
      >;
      executeSubscriptionUpdate: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          previousProductId?: string;
          previousSeats?: number | null;
          productId?: string;
          serverIdx?: number;
          serverURL?: string;
          subscriptionId: string;
          units?: number;
          updateBehavior?: string;
        },
        any
      >;
      getCurrentSubscription: FunctionReference<
        "query",
        "internal",
        { entityId: string },
        {
          amount: number | null;
          cancelAtPeriodEnd: boolean;
          canceledAt?: string | null;
          checkoutId: string | null;
          collectionMethod?: string;
          createdAt: string;
          currency: string | null;
          currentPeriodEnd: string | null;
          currentPeriodStart: string;
          customerId: string;
          discountId?: string | null;
          endedAt: string | null;
          endsAt?: string | null;
          id: string;
          lastTransactionId?: string | null;
          metadata: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          nextTransactionDate?: string | null;
          priceId?: string;
          product: {
            billingPeriod?: string;
            billingType: string;
            createdAt: string;
            currency: string;
            defaultSuccessUrl?: string | null;
            description: string | null;
            features?: Array<{ description: string; id: string }>;
            id: string;
            imageUrl?: string;
            metadata?: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            name: string;
            price: number;
            productUrl?: string;
            status: string;
            taxCategory?: string;
            taxMode?: string;
          };
          productId: string;
          recurringInterval: string | null;
          seats?: number | null;
          startedAt: string | null;
          status: string;
          trialEnd?: string | null;
          trialStart?: string | null;
        } | null
      >;
      getCustomerByEntityId: FunctionReference<
        "query",
        "internal",
        { entityId: string },
        {
          country?: string;
          createdAt?: string;
          email?: string;
          entityId: string;
          id: string;
          metadata?: Record<string, any>;
          mode?: string;
          name?: string | null;
          updatedAt?: string;
        } | null
      >;
      getProduct: FunctionReference<
        "query",
        "internal",
        { id: string },
        {
          billingPeriod?: string;
          billingType: string;
          createdAt: string;
          currency: string;
          defaultSuccessUrl?: string | null;
          description: string | null;
          features?: Array<{ description: string; id: string }>;
          id: string;
          imageUrl?: string;
          metadata?: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          name: string;
          price: number;
          productUrl?: string;
          status: string;
          taxCategory?: string;
          taxMode?: string;
        } | null
      >;
      getSubscription: FunctionReference<
        "query",
        "internal",
        { id: string },
        {
          amount: number | null;
          cancelAtPeriodEnd: boolean;
          canceledAt?: string | null;
          checkoutId: string | null;
          collectionMethod?: string;
          createdAt: string;
          currency: string | null;
          currentPeriodEnd: string | null;
          currentPeriodStart: string;
          customerId: string;
          discountId?: string | null;
          endedAt: string | null;
          endsAt?: string | null;
          id: string;
          lastTransactionId?: string | null;
          metadata: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          nextTransactionDate?: string | null;
          priceId?: string;
          productId: string;
          recurringInterval: string | null;
          seats?: number | null;
          startedAt: string | null;
          status: string;
          trialEnd?: string | null;
          trialStart?: string | null;
        } | null
      >;
      insertCustomer: FunctionReference<
        "mutation",
        "internal",
        {
          country?: string;
          createdAt?: string;
          email?: string;
          entityId: string;
          id: string;
          metadata?: Record<string, any>;
          mode?: string;
          name?: string | null;
          updatedAt?: string;
        },
        string
      >;
      listAllUserSubscriptions: FunctionReference<
        "query",
        "internal",
        { entityId: string },
        Array<{
          amount: number | null;
          cancelAtPeriodEnd: boolean;
          canceledAt?: string | null;
          checkoutId: string | null;
          collectionMethod?: string;
          createdAt: string;
          currency: string | null;
          currentPeriodEnd: string | null;
          currentPeriodStart: string;
          customerId: string;
          discountId?: string | null;
          endedAt: string | null;
          endsAt?: string | null;
          id: string;
          lastTransactionId?: string | null;
          metadata: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          nextTransactionDate?: string | null;
          priceId?: string;
          product: {
            billingPeriod?: string;
            billingType: string;
            createdAt: string;
            currency: string;
            defaultSuccessUrl?: string | null;
            description: string | null;
            features?: Array<{ description: string; id: string }>;
            id: string;
            imageUrl?: string;
            metadata?: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            name: string;
            price: number;
            productUrl?: string;
            status: string;
            taxCategory?: string;
            taxMode?: string;
          } | null;
          productId: string;
          recurringInterval: string | null;
          seats?: number | null;
          startedAt: string | null;
          status: string;
          trialEnd?: string | null;
          trialStart?: string | null;
        }>
      >;
      listCustomerSubscriptions: FunctionReference<
        "query",
        "internal",
        { customerId: string },
        Array<{
          amount: number | null;
          cancelAtPeriodEnd: boolean;
          canceledAt?: string | null;
          checkoutId: string | null;
          collectionMethod?: string;
          createdAt: string;
          currency: string | null;
          currentPeriodEnd: string | null;
          currentPeriodStart: string;
          customerId: string;
          discountId?: string | null;
          endedAt: string | null;
          endsAt?: string | null;
          id: string;
          lastTransactionId?: string | null;
          metadata: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          nextTransactionDate?: string | null;
          priceId?: string;
          productId: string;
          recurringInterval: string | null;
          seats?: number | null;
          startedAt: string | null;
          status: string;
          trialEnd?: string | null;
          trialStart?: string | null;
        }>
      >;
      listProducts: FunctionReference<
        "query",
        "internal",
        { includeArchived?: boolean },
        Array<{
          billingPeriod?: string;
          billingType: string;
          createdAt: string;
          currency: string;
          defaultSuccessUrl?: string | null;
          description: string | null;
          features?: Array<{ description: string; id: string }>;
          id: string;
          imageUrl?: string;
          metadata?: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          name: string;
          price: number;
          productUrl?: string;
          status: string;
          taxCategory?: string;
          taxMode?: string;
        }>
      >;
      listUserOrders: FunctionReference<
        "query",
        "internal",
        { entityId: string },
        Array<{
          affiliate?: string | null;
          amount: number;
          amountDue?: number;
          amountPaid?: number;
          checkoutId?: string | null;
          createdAt: string;
          currency: string;
          customerId: string;
          discountAmount?: number;
          discountId?: string | null;
          id: string;
          metadata?: Record<string, any>;
          mode?: string;
          productId: string;
          status: string;
          subTotal?: number;
          taxAmount?: number;
          transactionId?: string | null;
          type: string;
          updatedAt: string;
        }>
      >;
      listUserSubscriptions: FunctionReference<
        "query",
        "internal",
        { entityId: string },
        Array<{
          amount: number | null;
          cancelAtPeriodEnd: boolean;
          canceledAt?: string | null;
          checkoutId: string | null;
          collectionMethod?: string;
          createdAt: string;
          currency: string | null;
          currentPeriodEnd: string | null;
          currentPeriodStart: string;
          customerId: string;
          discountId?: string | null;
          endedAt: string | null;
          endsAt?: string | null;
          id: string;
          lastTransactionId?: string | null;
          metadata: Record<string, any>;
          mode?: string;
          modifiedAt: string | null;
          nextTransactionDate?: string | null;
          priceId?: string;
          product: {
            billingPeriod?: string;
            billingType: string;
            createdAt: string;
            currency: string;
            defaultSuccessUrl?: string | null;
            description: string | null;
            features?: Array<{ description: string; id: string }>;
            id: string;
            imageUrl?: string;
            metadata?: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            name: string;
            price: number;
            productUrl?: string;
            status: string;
            taxCategory?: string;
            taxMode?: string;
          } | null;
          productId: string;
          recurringInterval: string | null;
          seats?: number | null;
          startedAt: string | null;
          status: string;
          trialEnd?: string | null;
          trialStart?: string | null;
        }>
      >;
      patchSubscription: FunctionReference<
        "mutation",
        "internal",
        {
          cancelAtPeriodEnd?: boolean;
          clearOptimistic?: boolean;
          productId?: string;
          seats?: number | null;
          status?: string;
          subscriptionId: string;
        },
        any
      >;
      syncProducts: FunctionReference<
        "action",
        "internal",
        { apiKey: string; serverIdx?: number; serverURL?: string },
        any
      >;
      updateProduct: FunctionReference<
        "mutation",
        "internal",
        {
          product: {
            billingPeriod?: string;
            billingType: string;
            createdAt: string;
            currency: string;
            defaultSuccessUrl?: string | null;
            description: string | null;
            features?: Array<{ description: string; id: string }>;
            id: string;
            imageUrl?: string;
            metadata?: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            name: string;
            price: number;
            productUrl?: string;
            status: string;
            taxCategory?: string;
            taxMode?: string;
          };
        },
        any
      >;
      updateProducts: FunctionReference<
        "mutation",
        "internal",
        {
          products: Array<{
            billingPeriod?: string;
            billingType: string;
            createdAt: string;
            currency: string;
            defaultSuccessUrl?: string | null;
            description: string | null;
            features?: Array<{ description: string; id: string }>;
            id: string;
            imageUrl?: string;
            metadata?: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            name: string;
            price: number;
            productUrl?: string;
            status: string;
            taxCategory?: string;
            taxMode?: string;
          }>;
        },
        any
      >;
      updateSubscription: FunctionReference<
        "mutation",
        "internal",
        {
          subscription: {
            amount: number | null;
            cancelAtPeriodEnd: boolean;
            canceledAt?: string | null;
            checkoutId: string | null;
            collectionMethod?: string;
            createdAt: string;
            currency: string | null;
            currentPeriodEnd: string | null;
            currentPeriodStart: string;
            customerId: string;
            discountId?: string | null;
            endedAt: string | null;
            endsAt?: string | null;
            id: string;
            lastTransactionId?: string | null;
            metadata: Record<string, any>;
            mode?: string;
            modifiedAt: string | null;
            nextTransactionDate?: string | null;
            priceId?: string;
            productId: string;
            recurringInterval: string | null;
            seats?: number | null;
            startedAt: string | null;
            status: string;
            trialEnd?: string | null;
            trialStart?: string | null;
          };
        },
        any
      >;
    };
  };
};
