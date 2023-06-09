const Category = require('../../api/v1/category/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const createCategory = async (req) => {
    const { kode, name } = req.body;

    const checkKode = await Category.findOne({ kode: kode })

    if (checkKode) throw new BadRequestError(`Kode Category has been created`);

    const checkName = await Category.findOne({ name: name })

    if (checkName) throw new BadRequestError(`Name Category has been created`);

    const result = await Category.create({
        kode,
        name
    })

    return result;

}

const getAllCategory = async (req) => {

    const result = await Category.find()
        .select('kode name')

    if (!result) throw new NotFoundError('Tidak ada Category');

    return result;
}

const getOneCategory = async (req) => {
    const { id } = req.params;

    const result = await Category.findOne({ _id: id })
        .select('kode name')

    if (!result) throw new NotFoundError(`Category dengan ${id} tidak ditemukan`);

    return result;
}

const updateCategory = async (req) => {
    const { id } = req.params;
    const { kode, name } = req.body;

    const checkKode = await Category.findOne({  
        kode,
        _id: { $ne: id }
    });

        if (checkKode) throw new BadRequestError('kategori kode duplikat');
    const checkName = await Category.findOne({
        name,
        _id: { $ne: id }
    })
    if (checkName) throw new BadRequestError('kategori nama duplikat')
    const result = await Category.findByIdAndUpdate(
        { _id: id },
        {
            name,
            kode
        },
        { new: true, runValidators: true }

    )

    if (!result) throw new NotFoundError(`Category dengan ${id} tidak ditemukan`);

    return result;
}

const deleteCategory = async (req) => {
    const { id } = req.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) throw new NotFoundError('Category not found');

    return result;
}

const checkCategory = async (id) => {
    const result = await Category.findOne({ _id: id })

    if (!result) throw new NotFoundError('Category id not found');
    return result
}

const countCategory = async () => {
    const result = await Category.find().count();

    return result;
}

module.exports = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
    checkCategory,
    countCategory
}