import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// To access Appwrite functionalities
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

// To use database functionality from Appwrite through client
const database = new Databases(client);


export const updateSearchCount = async (searchTerm, movie) => {
    //console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

    // 1. Use Appwrite SDK to check if the search term exists in the database
    try {
        // To check, get the list first. Parameters are DB id, collection id and [] query
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)   //('attribute from DB', variable which is parameter)
        ])

        // Checking if the document with the search term exists
        if(result.documents.length > 0) {
            // I think this one gets the first record of the movie list
            const doc = result.documents[0];

            // 2. If it does, update the count
            // Parameters are DB id, collection id, document id (write .$id to get it from database) and {} data (how are we updating the doc)
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
    
        } else {
            // 3. If it doesn't, create a new document with the search term and count as 1
            // Parameters are DB id, collection id, document id (get unique id using ID from appwrite) and {} data (values of the new doc)
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })


        }
    } catch (error) {
        console.log(error);
    }

}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (error) {
        console.error(error);
    }
}





