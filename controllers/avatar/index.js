/**
 * User: ngnono
 * Date: 15-11-26
 * Time: 下午4:34
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var identicon = require('identicon');
var debug = require('debug');


/**
 * 生成
 * @param opts { id: 'ajido', size: 150 }
 * @returns {Promise}
 */
let g = function (opts) {

    opts = opts || {};

    let p = new Promise(function (resolve, reject) {

        identicon.generate(opts, function (err, buffer) {
            if (err) {
                reject(err);
                return;
            }

            resolve(buffer);

            //// buffer is identicon in PNG format.
            //fs.writeFileSync(__dirname + '/identicon.png', buffer);
        });
    });

    return p;
};


module.exports = {

    get: function*(id) {


        let self = this;
        //gitlab  http://www.gravatar.com/avatar/f85b5158467dfd5b4678788d5e24aad5?s=24&d=identicon
        //        http://localhost:9000/avatar/f85b5158467dfd5b4678788d5e24aad5?s=24&d=identicon
        //redmine http://www.gravatar.com/avatar/9f83d932a738868fb15fe1540239024a?rating=PG&size=24&default=identicon
        let query = self.query;

        let size = Number(query.s) || Number(query.size) || 10;
        let d = query.d || query.default || 'identicon';
        let rating = query.rating || '';

        debug('id:%s', id);
        debug('size:%s', size);


        let bf = yield g({
            id: id,
            size: size
        });

        self.type = 'image/png';
        self.body = bf;

    }
};
