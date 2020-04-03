import Realm from 'realm';
import Account from './Account';
import Group from './Group';
import SubGroup from './SubGroup';
import { v1 as uuid } from 'react-native-uuid';

export async function open() {
    try {
        if (!global.Database) {
            console.log('\x1b[35m', 'Creating connection Realm...')
            global.Database = await Realm.open({
                schema: [Account, Group, SubGroup],
                schemaVersion: 4
            });
            console.log('\x1b[32m', 'Success conection Realm!', global.Database.path);
            global.uuid = uuid;
            /*console.log(global.Database.objects('SubGroup').filtered(`group.id = '1c9c60f0-73a5-11ea-95cd-0fa95c492d8e'`))
            global.Database.write(() => {
                global.Database.create('SubGroup', {
                    id: global.uuid(),
                    name: 'Vinicius',
                    group: global.Database.objects('Group').filtered(`id = '1c9c60f0-73a5-11ea-95cd-0fa95c492d8e'`)[0],
                });
            });*/
        }
    } catch (error) {
        console.log('ERROR OPEN REALM', error);
    }
}

export async function close() {
    console.log('\x1b[35m', 'Close connection Realm...');
    if (global.Database !== null && !global.Database.isClosed) {
        global.Database.close();
        global.Database = null;
    }
}
