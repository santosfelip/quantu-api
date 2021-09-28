import ger from 'ger';
import admin from 'firebase-admin';

export class CollaborativeFilter {
    private recomendationLibrary;
    private namespace: string;
    
    constructor() {
        this.recomendationLibrary = new ger.GER(new ger.MemESM());
        this.namespace = 'products';
    }

    public async getRecommendations(idPerson: string): Promise<any> {
        try {
            const eventsSavedInDb: Array<IEvents> = [];

            // Salva todos eventos
            const allEvents = await admin.firestore().collection('events').get();

            let recomendations = [];
            if(allEvents.size) {
                allEvents.docs.forEach(event => eventsSavedInDb.push(event.data() as IEvents));

                //Inicia a nova instância do namespace
                await this.initializeNamespace();

                // Insere os Eventos na Instancia
                this.insertAllEvents(eventsSavedInDb);

                recomendations = await this.recomendationLibrary.recommendations_for_person(
                    this.namespace, idPerson, { actions: {likes: 1} }
                );
            }

            return recomendations;
        } catch (err) {
            throw new Error('Erro ao buscar pelas recomendações!');
        }
    }

    private async initializeNamespace(): Promise<void> {
        try {
            await this.recomendationLibrary.initialize_namespace(this.namespace);
        } catch (err) {
            throw new Error('Erro ao criar um namespace');
        }
    }

    private insertAllEvents(arrayOfEvents: Array<IEvents>): void {
        try {
            this.recomendationLibrary.events(arrayOfEvents);
        } catch (err) {
            throw new Error('Erro ao inserir os Eventos');
        }
    }

};

export interface IEvents {
    namespace: string,
    person: string,
    action: 'likes' | 'dislikes',
    thing: string
};