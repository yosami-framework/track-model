/**
 * Asyncronous attribute reader.
 */
class AsyncAttributeReader {
  /**
   * Initialize.
   * @param {object}   options Options.
   * @param {function} block   Data getter block.
   */
  constructor(options = {default: null, expiresIn: null}, block) {
    this._block = block;
    this._default = options.default;
    this._expiresIn = options.expiresIn;
    this._expiredAt = -1;
  }

  /**
   * Get value.
   * @return {object} value.
   */
  get value() {
    if (!this._isFetching && this._expiredAt < Date.now()) {
      this._value = null;
      this._isFetching = true;

      const blockValue = this._block();
      if (blockValue instanceof Promise) {
        blockValue.then((value) => {
          if (this._expiresIn) {
            this._expiredAt = Date.now() + (this._expiresIn * 1000);
          } else {
            this._expiredAt = Number.MAX_VALUE; // Infinity cache.
          }
          this._value = value;
          this._isFetching = false;
        }).catch(() => {
          this._isFetching = false;
        });
      } else {
        this._isFetching = false;
      }
    }

    return this._value || this._default;
  }

  /**
   * Clear cache.
   */
  clear() {
    this._expiredAt = -1;
  }
}

module.exports = AsyncAttributeReader;
