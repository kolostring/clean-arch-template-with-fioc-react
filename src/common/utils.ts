import {
  DIConsumer,
  DIConsumerDependencies,
  DIConsumerParams,
} from "fioc-react";

function consumerAsClient<
  T extends DIConsumerDependencies,
  K extends DIConsumerParams,
  L
>(consumer: DIConsumer<T, K, L>): DIConsumer<T, K, L> {
  return {
    ...consumer,
  };
}
