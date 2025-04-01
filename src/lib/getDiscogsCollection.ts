export interface DiscogsCollectionResponse {
  releases: CollectionItem[];
}

export interface CollectionItem {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: BasicInformation;
}

export interface BasicInformation {
  id: number;
  title: string;
  year: number;
  resource_url: string;
  // thumb: string;
  // cover_image: string;
}

export interface DiscogsCollectionResponseError {
  error: string;
}

export async function getDiscogsCollection(
  username: string,
  page: number = 1
): Promise<CollectionItem | DiscogsCollectionResponseError> {
  const url = `https://api.discogs.com/users/${username}/collection/folders/0/releases?page=${page}&per_page=50`;

  try {
    const response = await fetch(
      url,
      {
        "headers": {
          "Content-Type": "application/json",
          "user-agent": "GetDiscogsCollection/1.0",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DiscogsCollectionResponse = await response.json();
    return data.releases;
  } catch (error) {
    console.error("Error fetching Discogs collection:", error);
    return { error: "Failed to fetch Discogs collection" };
  }
}
