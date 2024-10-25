import json

## Endpoint https://api.contentful.com/organizations/{organizationId}/taxonomy/concepts?conceptScheme={conceptSchemeId}&access_token={cma_token}

def get_taxonomies():
    filePath = './output/taxonomy.json'
    result = {}
    with open(filePath, 'r') as file:
        data = json.load(file)
        mapList = {}
        for item in data['items']:
            if list(item['broader']).__len__() == 0:
                mapList[item['sys']['id']] = {
                    'label': item['prefLabel']['en-US'],
                }
        
        for item in data['items']:
            if list(item['broader']).__len__() > 0:
                if mapList.get(item['broader'][0]['sys']['id']):
                    category = mapList.get(item['broader'][0]['sys']['id'])
                    print(result.get(category['label']))
                    if result.get(category['label']):
                        # do something
                        temp = result.get(category['label'])
                        temp.__setitem__(item['prefLabel']['en-US'], item['sys']['id'])
                        print(result.keys())
                    else:
                        result.__setitem__(category['label'], {
                            item['prefLabel']['en-US']: item['sys']['id'],
                        })
    print(result)
    
    categoryFilePath = './output/category.json'
    dataFile = open(categoryFilePath, 'w')
    dataFile.write(json.dumps(result))

        
                

def main():
    get_taxonomies()

main()