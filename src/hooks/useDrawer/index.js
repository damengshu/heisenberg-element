import { getCurrentInstance, nextTick, ref, unref, watchEffect, toRaw } from "vue"
import { isEqual } from "loadsh"

const dataTransferRef = ref({})

export function useDrawer () {
  const drawer = ref(null)
  const loaded = ref(false)
  const uid = ref("")

  if (!getCurrentInstance()) {
    throw new Error(
      "useDrawer() can only be used inside setup() or functional components!"
    )
  }

  /**
   * @param { Function } setPoprs
   * @param {string} uuid
   */
  function register (setPoprs, uuid) {
    uid.value = uuid
    drawer.value = setPoprs
    loaded.value = true
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      console.error("useDrawer instance is undefined!")
    }
    return instance
  }

  const methods = {
    setDrawerProps: (props) => {
      getInstance() && getInstance().setDrawerProps(props)
    },
    openDrawer: (data, openOnSet = true) => {
      getInstance() && getInstance().setDrawerProps({ value: true })
      if (!data) return
      if (openOnSet) {
        dataTransferRef.value = Object.assign({}, unref(dataTransferRef), {
          [unref(uid)]: null
        })

        dataTransferRef.value = Object.assign({}, unref(dataTransferRef), {
          [unref(uid)]: toRaw(data)
        })
        return;
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data))
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data)
      }
    },
    closeDrawer: () => {
      getInstance() && getInstance().setDrawerProps({ value: false });
    },
    setConfirmLoadong: (loading = true) => {
      getInstance() && getInstance().setConfirmLoadong(loading);
    }
  }

  return [register, methods]
}

export function useDrawerInner (callbackFn) {
  const drawerInstanceRef = ref(null)
  const currentInstance = getCurrentInstance().proxy
  const uidRef = ref('')

  if (!getCurrentInstance()) {
    throw new Error(
      "useDrawerInner() can only be used inside setup() or functional components!"
    );
  }
  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      error('useDrawerInner instance is undefined!');
      return;
    }
    return instance;
  }

  const register = (modalInstance, uuid) => {
    uidRef.value = uuid;
    drawerInstanceRef.value = modalInstance;
    currentInstance._setupContext.emit('register', modalInstance, uuid);
  };

  const methods = {
    setDrawerProps: (props) => {
      getInstance() && getInstance().setDrawerProps(props);
    },
    closeDrawer: () => {
      getInstance() && getInstance().setDrawerProps({ value: false });
    },
    setConfirmLoadong: (loading = true) => {
      getInstance() && getInstance().setDrawerProps({ confirmLoading: loading });
    }
  }

  watchEffect(() => {
    const data = dataTransferRef.value[unref(uidRef)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data);
    })

  })

  return [
    register,
    methods
  ]

}

function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}
