import { projectStorage } from '../firebase/config';
import { useEffect } from 'react';

const useDiscovery = () => {
    const files = [];

    const addItemsToTheList = items => {
        items.forEach(ref => {
            files.push(ref.name + ": " + ref.fullPath);
        })
    }

    const listItemsInRef = ref =>{
        ref.listAll().then(response => {
            addItemsToTheList(response.items);
            if(response && response.prefixes){
                response.prefixes.forEach(sub => listItemsInRef(sub))
            }
        })
    }
    
    useEffect(() => {
        const discoveryRoot = projectStorage.ref('albums');
        listItemsInRef(discoveryRoot);
    }, [])
    return files;
}

export default useDiscovery
