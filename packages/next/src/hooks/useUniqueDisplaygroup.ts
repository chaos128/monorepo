import { ISearchDocument } from 'ns-ts-interfaces';
import { useMemo } from 'react';

export function useUniqueDiplayGroup(
  documents?: ISearchDocument[] | null,
): ISearchDocument[] {
  const displayGroupMap = useMemo(() => {
    const resultMap = new Map<string, string>();
    documents?.forEach((document) => {
      const { displayGroup } = document;
      if (!displayGroup || resultMap.has(displayGroup)) {
        return;
      }

      resultMap.set(displayGroup, documentKey(document));
    });

    return resultMap;
  }, [documents]);

  const uniqueDocuments = useMemo(() => {
    if (!Array.isArray(documents)) {
      return [];
    }
    return documents.filter(isAllowedDocument);
  }, [documents]);

  return uniqueDocuments;

  function documentKey(document: ISearchDocument) {
    return `${document.brand} ${document.modelName} ${document.name}`;
  }

  function isAllowedDocument(document: ISearchDocument) {
    const { displayGroup } = document;
    return (
      !displayGroup ||
      displayGroupMap.get(displayGroup) === documentKey(document)
    );
  }
}
