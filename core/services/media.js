import Media from 'models/media'
import { set as cacheSet, incr as cacheIncr } from 'services/cache'

export function restore(ids) {
  return Media
    .update({
      _id: { $in: ids }
    }, {
      deleted: false
    }, {
      multi: true
    })
    .exec()
}

export function remove(ids) {
  return Media
    .update({
      _id: { $in: ids }
    }, {
      deleted: true
    }, {
      multi: true
    })
    .exec()
}

export function paging(page, take) {
  return Media
    .find()
    .sort('-alias')
    .skip((page - 1) * take)
    .limit(take)
    .lean()
    .exec()
}

export function getFrom(id, take) {
  const query = (!!id) ? { _id: { $gt: id } } : {}

  console.log(!!id, query)

  return Media.find(query).limit(take).lean().exec()
}

export function getMaxAlias() {
  return Media.findOne().sort('-alias').lean().exec()
    .then(media => {
      if (!media) return -1

      return media.alias
    })
}

export function create(data) {
  const media = new Media(data)

  return media.save()
}

export function getOneFrom(id) {
  return Media.findOne({
    _id: { $gt: id }
  }).lean().exec()
}

export function getOne() {
  return Media.findOne().lean().exec()
}

export function get(id) {
  return Media.findById(id).lean().exec()
}

export function updateById(_id, data) {
  return Media
    .findOneAndUpdate({ _id  }, data, { new: true })
    .lean()
    .exec()
}

export function count() {
  return Media.count()
}

export function getByHashes(hashes) {
  return Media
    .find({
      hash: { $in: hashes }
    })
    .lean()
    .exec()
}

export function getByHash(hash) {
  return Media
    .findOne({ hash })
    .lean()
    .exec()
}
