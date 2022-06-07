// Generated with util/create-component.js

import { Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
import NosearchProvider from "../../NosearchProvider";
import Tab from "./Tab";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import TabPanels from "./TabPanels";
import Tabs from "./Tabs";

export default {
  title: "UI/Tabs",
  component: Tabs,
} as Meta;

export const Sample = () => (
  <NosearchProvider>
    <div className="flex flex-col space-y-5">
      <Tabs uniqueKey="tab1" defaultIndex={2}>
        <TabList sticky tabWidth="w-[20rem]">
          <Tab
            onTabClick={() => {
              console.log("홈");
            }}
          >
            홈
          </Tab>
          <Tab>카테고리</Tab>
          <Tab>공동구매</Tab>
          <Tab>스토어</Tab>
          <Tab>커뮤니티</Tab>
        </TabList>
        <TabPanels eager>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs uniqueKey="tab2">
        <TabList sticky>
          <Tab>tab 1</Tab>
          <Tab>tab 2</Tab>
          <Tab>tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
          <TabPanel>
            <SampleLoadingComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </NosearchProvider>
);

const SampleLoadingComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  if (loading) return <div>loading...</div>;
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales,
      justo nec iaculis vehicula, mi ipsum consectetur lorem, a elementum diam
      velit euismod nibh. Mauris nec cursus ante. Praesent malesuada quis erat
      et fermentum. Aenean pellentesque, urna in tempus blandit, felis diam
      suscipit turpis, et vulputate turpis purus et urna. Nulla tincidunt velit
      justo, quis egestas metus pretium sed. Vivamus bibendum tincidunt orci
      tempus tempor. Sed libero lacus, posuere molestie augue eget, suscipit
      hendrerit metus. Orci varius natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Pellentesque vitae metus justo. Donec non
      tortor in eros maximus suscipit nec ac massa. Praesent imperdiet mollis
      fermentum. Fusce eget dolor sit amet risus rhoncus varius sit amet vel
      lacus. Donec venenatis, nunc non molestie luctus, lectus erat feugiat
      mauris, in facilisis ex elit vel tortor. Fusce vulputate, urna nec posuere
      porta, sem quam congue massa, cursus molestie turpis urna quis magna.
      Mauris pretium enim sit amet eleifend tincidunt. Aliquam hendrerit lectus
      at sollicitudin laoreet. Curabitur pulvinar in arcu vitae molestie. In sit
      amet sapien quis risus viverra elementum vel vitae orci. Mauris dapibus
      luctus hendrerit. Etiam sed elit a quam semper semper id et metus. Aliquam
      semper quam at enim pharetra, at pharetra massa venenatis. Mauris ut
      ligula nisi. Sed dignissim, risus cursus mollis faucibus, metus nunc
      commodo eros, non sodales leo neque vitae massa. Morbi vel sagittis ante,
      sed ultricies est. Nulla sed quam eu risus ultrices sodales in sit amet
      nibh. Sed quis lacus eu neque blandit ultrices. Nunc bibendum lacinia
      lacus et finibus. Quisque dignissim consequat aliquam. Nulla id est at
      quam consectetur semper ultrices ac mauris. Proin nec magna tempor,
      pellentesque leo sed, tempus massa. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Morbi quis est nec orci elementum volutpat.
      Vestibulum mollis tortor non dolor lobortis elementum eget eu erat. Fusce
      tempor quam ornare tortor commodo, sit amet lacinia magna tempus. Integer
      sed auctor lectus. Mauris gravida, nunc non consectetur faucibus, sapien
      tellus bibendum ligula, eu vulputate erat urna a augue. Interdum et
      malesuada fames ac ante ipsum primis in faucibus. Curabitur vel lacinia
      sapien. Ut leo nisi, molestie a lacus vel, imperdiet lacinia ipsum.
      Vivamus dapibus quam ante. Sed vitae mauris nec mi luctus lacinia. Donec
      et lobortis nunc. Nullam hendrerit mi eu nisi finibus consectetur.
      Phasellus sed urna vel elit eleifend ultricies. Interdum et malesuada
      fames ac ante ipsum primis in faucibus. Etiam vehicula ligula non risus
      malesuada egestas vitae vel libero. Nam volutpat leo lacinia convallis
      gravida. Mauris ac rhoncus augue. In vehicula metus nec dolor faucibus,
      molestie sollicitudin arcu consectetur. Vestibulum tristique, lorem quis
      tempor auctor, arcu nulla tincidunt sem, vitae varius lacus neque et
      felis. Nullam ut quam metus. In pulvinar felis eu mattis hendrerit.
      Pellentesque faucibus facilisis enim scelerisque bibendum. Maecenas at
      felis neque. Suspendisse facilisis fermentum diam, rhoncus euismod sem.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales,
      justo nec iaculis vehicula, mi ipsum consectetur lorem, a elementum diam
      velit euismod nibh. Mauris nec cursus ante. Praesent malesuada quis erat
      et fermentum. Aenean pellentesque, urna in tempus blandit, felis diam
      suscipit turpis, et vulputate turpis purus et urna. Nulla tincidunt velit
      justo, quis egestas metus pretium sed. Vivamus bibendum tincidunt orci
      tempus tempor. Sed libero lacus, posuere molestie augue eget, suscipit
      hendrerit metus. Orci varius natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Pellentesque vitae metus justo. Donec non
      tortor in eros maximus suscipit nec ac massa. Praesent imperdiet mollis
      fermentum. Fusce eget dolor sit amet risus rhoncus varius sit amet vel
      lacus. Donec venenatis, nunc non molestie luctus, lectus erat feugiat
      mauris, in facilisis ex elit vel tortor. Fusce vulputate, urna nec posuere
      porta, sem quam congue massa, cursus molestie turpis urna quis magna.
      Mauris pretium enim sit amet eleifend tincidunt. Aliquam hendrerit lectus
      at sollicitudin laoreet. Curabitur pulvinar in arcu vitae molestie. In sit
      amet sapien quis risus viverra elementum vel vitae orci. Mauris dapibus
      luctus hendrerit. Etiam sed elit a quam semper semper id et metus. Aliquam
      semper quam at enim pharetra, at pharetra massa venenatis. Mauris ut
      ligula nisi. Sed dignissim, risus cursus mollis faucibus, metus nunc
      commodo eros, non sodales leo neque vitae massa. Morbi vel sagittis ante,
      sed ultricies est. Nulla sed quam eu risus ultrices sodales in sit amet
      nibh. Sed quis lacus eu neque blandit ultrices. Nunc bibendum lacinia
      lacus et finibus. Quisque dignissim consequat aliquam. Nulla id est at
      quam consectetur semper ultrices ac mauris. Proin nec magna tempor,
      pellentesque leo sed, tempus massa. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Morbi quis est nec orci elementum volutpat.
      Vestibulum mollis tortor non dolor lobortis elementum eget eu erat. Fusce
      tempor quam ornare tortor commodo, sit amet lacinia magna tempus. Integer
      sed auctor lectus. Mauris gravida, nunc non consectetur faucibus, sapien
      tellus bibendum ligula, eu vulputate erat urna a augue. Interdum et
      malesuada fames ac ante ipsum primis in faucibus. Curabitur vel lacinia
      sapien. Ut leo nisi, molestie a lacus vel, imperdiet lacinia ipsum.
      Vivamus dapibus quam ante. Sed vitae mauris nec mi luctus lacinia. Donec
      et lobortis nunc. Nullam hendrerit mi eu nisi finibus consectetur.
      Phasellus sed urna vel elit eleifend ultricies. Interdum et malesuada
      fames ac ante ipsum primis in faucibus. Etiam vehicula ligula non risus
      malesuada egestas vitae vel libero. Nam volutpat leo lacinia convallis
      gravida. Mauris ac rhoncus augue. In vehicula metus nec dolor faucibus,
      molestie sollicitudin arcu consectetur. Vestibulum tristique, lorem quis
      tempor auctor, arcu nulla tincidunt sem, vitae varius lacus neque et
      felis. Nullam ut quam metus. In pulvinar felis eu mattis hendrerit.
      Pellentesque faucibus facilisis enim scelerisque bibendum. Maecenas at
      felis neque. Suspendisse facilisis fermentum diam, rhoncus euismod sem.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales,
      justo nec iaculis vehicula, mi ipsum consectetur lorem, a elementum diam
      velit euismod nibh. Mauris nec cursus ante. Praesent malesuada quis erat
      et fermentum. Aenean pellentesque, urna in tempus blandit, felis diam
      suscipit turpis, et vulputate turpis purus et urna. Nulla tincidunt velit
      justo, quis egestas metus pretium sed. Vivamus bibendum tincidunt orci
      tempus tempor. Sed libero lacus, posuere molestie augue eget, suscipit
      hendrerit metus. Orci varius natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Pellentesque vitae metus justo. Donec non
      tortor in eros maximus suscipit nec ac massa. Praesent imperdiet mollis
      fermentum. Fusce eget dolor sit amet risus rhoncus varius sit amet vel
      lacus. Donec venenatis, nunc non molestie luctus, lectus erat feugiat
      mauris, in facilisis ex elit vel tortor. Fusce vulputate, urna nec posuere
      porta, sem quam congue massa, cursus molestie turpis urna quis magna.
      Mauris pretium enim sit amet eleifend tincidunt. Aliquam hendrerit lectus
      at sollicitudin laoreet. Curabitur pulvinar in arcu vitae molestie. In sit
      amet sapien quis risus viverra elementum vel vitae orci. Mauris dapibus
      luctus hendrerit. Etiam sed elit a quam semper semper id et metus. Aliquam
      semper quam at enim pharetra, at pharetra massa venenatis. Mauris ut
      ligula nisi. Sed dignissim, risus cursus mollis faucibus, metus nunc
      commodo eros, non sodales leo neque vitae massa. Morbi vel sagittis ante,
      sed ultricies est. Nulla sed quam eu risus ultrices sodales in sit amet
      nibh. Sed quis lacus eu neque blandit ultrices. Nunc bibendum lacinia
      lacus et finibus. Quisque dignissim consequat aliquam. Nulla id est at
      quam consectetur semper ultrices ac mauris. Proin nec magna tempor,
      pellentesque leo sed, tempus massa. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Morbi quis est nec orci elementum volutpat.
      Vestibulum mollis tortor non dolor lobortis elementum eget eu erat. Fusce
      tempor quam ornare tortor commodo, sit amet lacinia magna tempus. Integer
      sed auctor lectus. Mauris gravida, nunc non consectetur faucibus, sapien
      tellus bibendum ligula, eu vulputate erat urna a augue. Interdum et
      malesuada fames ac ante ipsum primis in faucibus. Curabitur vel lacinia
      sapien. Ut leo nisi, molestie a lacus vel, imperdiet lacinia ipsum.
      Vivamus dapibus quam ante. Sed vitae mauris nec mi luctus lacinia. Donec
      et lobortis nunc. Nullam hendrerit mi eu nisi finibus consectetur.
      Phasellus sed urna vel elit eleifend ultricies. Interdum et malesuada
      fames ac ante ipsum primis in faucibus. Etiam vehicula ligula non risus
      malesuada egestas vitae vel libero. Nam volutpat leo lacinia convallis
      gravida. Mauris ac rhoncus augue. In vehicula metus nec dolor faucibus,
      molestie sollicitudin arcu consectetur. Vestibulum tristique, lorem quis
      tempor auctor, arcu nulla tincidunt sem, vitae varius lacus neque et
      felis. Nullam ut quam metus. In pulvinar felis eu mattis hendrerit.
      Pellentesque faucibus facilisis enim scelerisque bibendum. Maecenas at
      felis neque. Suspendisse facilisis fermentum diam, rhoncus euismod sem.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales,
      justo nec iaculis vehicula, mi ipsum consectetur lorem, a elementum diam
      velit euismod nibh. Mauris nec cursus ante. Praesent malesuada quis erat
      et fermentum. Aenean pellentesque, urna in tempus blandit, felis diam
      suscipit turpis, et vulputate turpis purus et urna. Nulla tincidunt velit
      justo, quis egestas metus pretium sed. Vivamus bibendum tincidunt orci
      tempus tempor. Sed libero lacus, posuere molestie augue eget, suscipit
      hendrerit metus. Orci varius natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Pellentesque vitae metus justo. Donec non
      tortor in eros maximus suscipit nec ac massa. Praesent imperdiet mollis
      fermentum. Fusce eget dolor sit amet risus rhoncus varius sit amet vel
      lacus. Donec venenatis, nunc non molestie luctus, lectus erat feugiat
      mauris, in facilisis ex elit vel tortor. Fusce vulputate, urna nec posuere
      porta, sem quam congue massa, cursus molestie turpis urna quis magna.
      Mauris pretium enim sit amet eleifend tincidunt. Aliquam hendrerit lectus
      at sollicitudin laoreet. Curabitur pulvinar in arcu vitae molestie. In sit
      amet sapien quis risus viverra elementum vel vitae orci. Mauris dapibus
      luctus hendrerit. Etiam sed elit a quam semper semper id et metus. Aliquam
      semper quam at enim pharetra, at pharetra massa venenatis. Mauris ut
      ligula nisi. Sed dignissim, risus cursus mollis faucibus, metus nunc
      commodo eros, non sodales leo neque vitae massa. Morbi vel sagittis ante,
      sed ultricies est. Nulla sed quam eu risus ultrices sodales in sit amet
      nibh. Sed quis lacus eu neque blandit ultrices. Nunc bibendum lacinia
      lacus et finibus. Quisque dignissim consequat aliquam. Nulla id est at
      quam consectetur semper ultrices ac mauris. Proin nec magna tempor,
      pellentesque leo sed, tempus massa. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Morbi quis est nec orci elementum volutpat.
      Vestibulum mollis tortor non dolor lobortis elementum eget eu erat. Fusce
      tempor quam ornare tortor commodo, sit amet lacinia magna tempus. Integer
      sed auctor lectus. Mauris gravida, nunc non consectetur faucibus, sapien
      tellus bibendum ligula, eu vulputate erat urna a augue. Interdum et
      malesuada fames ac ante ipsum primis in faucibus. Curabitur vel lacinia
      sapien. Ut leo nisi, molestie a lacus vel, imperdiet lacinia ipsum.
      Vivamus dapibus quam ante. Sed vitae mauris nec mi luctus lacinia. Donec
      et lobortis nunc. Nullam hendrerit mi eu nisi finibus consectetur.
      Phasellus sed urna vel elit eleifend ultricies. Interdum et malesuada
      fames ac ante ipsum primis in faucibus. Etiam vehicula ligula non risus
      malesuada egestas vitae vel libero. Nam volutpat leo lacinia convallis
      gravida. Mauris ac rhoncus augue. In vehicula metus nec dolor faucibus,
      molestie sollicitudin arcu consectetur. Vestibulum tristique, lorem quis
      tempor auctor, arcu nulla tincidunt sem, vitae varius lacus neque et
      felis. Nullam ut quam metus. In pulvinar felis eu mattis hendrerit.
      Pellentesque faucibus facilisis enim scelerisque bibendum. Maecenas at
      felis neque. Suspendisse facilisis fermentum diam, rhoncus euismod sem.
    </div>
  );
};
