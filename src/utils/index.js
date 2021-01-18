import BN from "bn.js";

const BN_TEN = new BN(10);

/**
 * Parses string input and returns a big number of plancks
 * @param {*} value 
 * @param {*} decimals 
 */
export const parseInput = (value, decimals) => {
  const decimal = value.trim().match(/^(\d+)\.(\d+)$/);
  if (decimal) {
    const div = new BN(decimal[1]);
    const modString = decimal[2].substr(0, decimals);
    const mod = new BN(modString);

    return div
      .mul(BN_TEN.pow(new BN(decimals)))
      .add(mod.mul(BN_TEN.pow(new BN(decimals - modString.length))));
  }
  return new BN(value.trim()).mul(BN_TEN.pow(new BN(decimals)));
};

/**
 * Transaction handler. Promise resolves on `ExtrinsicSuccess` event, otherwise rejects.
 * @param {*} response 
 */
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
