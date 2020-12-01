export const transactionHandler = (response) => {
  return new Promise((resolve, reject) => {
    response.events
      .filter((record) => !!record.event)
      .map(({ event }) => {
        if (event.section === "system" && event.method === "ExtrinsicFailed") {
          const [dispatchError] = event.data;
          if (dispatchError.isModule) {
            try {
              const mod = dispatchError.asModule;
              const error = mod.registry.findMetaError(mod);

              return reject({
                event,
                message: `${error.section}.${error.name}: ${error.documentation}`,
              });
            } catch (error) {
              // swallow
            }
          }
          return reject({
            event,
            message: `${event.section}.${event.method}`,
          });
        } else if (
          event.section === "system" &&
          event.method === "ExtrinsicSuccess"
        ) {
          resolve(event);
        }
      });
  });
};
