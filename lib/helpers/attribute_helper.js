/**
 * A helper of attribute.
 */
class AttributeHelper {
  /**
   * Get getters.
   * @param {object} obj Object.
   * @return {array<string>} getters of object.
   */
  static getGetters(obj) {
    const results     = [];
    const descriptors = this._getAllPropertyDescriptor(obj);

    for (let key in descriptors) {
      if (descriptors.hasOwnProperty(key)) {
        if (typeof descriptors[key].get === 'function') {
          results.push(key);
        }
      }
    }

    return results;
  }

  /**
   * Get setters.
   * @param {object} obj Object.
   * @return {array<string>} setters of object.
   */
  static getSetters(obj) {
    const results     = [];
    const descriptors = this._getAllPropertyDescriptor(obj);

    for (let key in descriptors) {
      if (descriptors.hasOwnProperty(key)) {
        if (typeof descriptors[key].set === 'function') {
          results.push(key);
        }
      }
    }

    return results;
  }

  /**
   * Get all property descriptor of obj.
   * @param {object} obj Object.
   * @return {array<Descriptor>} descriptors.
   */
  static _getAllPropertyDescriptor(obj) {
    let descriptors = {};

    while (obj && obj instanceof Object) {
      const props = Object.getOwnPropertyNames(obj);

      for (let i = 0; i < props.length; ++i) {
        const name       = props[i];
        const descriptor = Object.getOwnPropertyDescriptor(obj, name);
        if (descriptor) {
          descriptors[name] = descriptor;
        }
      }

      obj = Object.getPrototypeOf(obj);
    }

    return descriptors;
  }
}

module.exports = AttributeHelper;
