import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './Data/users.js'
import voitures from './Data/voitures.js'
import User from './models/userModel.js'
import Voiture from './models/voitureModel.js'
import connectDB from './config/db.js'

dotenv.config()

await connectDB()

const importData = async () => {
  try {
    await Voiture.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleVoitures = voitures.map((voiture) => {
      return { ...voiture, user: adminUser }
    })

    await Voiture.insertMany(sampleVoitures)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Voiture.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
